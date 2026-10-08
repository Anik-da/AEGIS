import { firestore } from '../config/firebase.js';

export interface QueryFilter {
  [key: string]: any;
}

export class FirestoreQuery<T> implements PromiseLike<T> {
  private sortOption?: Record<string, 1 | -1>;
  private limitCount?: number;
  private skipCount?: number;

  constructor(
    private model: FirestoreModel<any>,
    private filter: QueryFilter = {},
    private isSingle: boolean = false
  ) {}

  public sort(sortOption: Record<string, 1 | -1>): this {
    this.sortOption = sortOption;
    return this;
  }

  public limit(n: number): this {
    this.limitCount = n;
    return this;
  }

  public skip(n: number): this {
    this.skipCount = n;
    return this;
  }

  public async then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    try {
      const results = await this.model.findWithSortLimit({
        filter: this.filter,
        sort: this.sortOption,
        limit: this.limitCount,
        skip: this.skipCount
      });
      const finalResult = this.isSingle ? (results[0] || null) : results;
      return onfulfilled ? onfulfilled(finalResult as T) : (finalResult as unknown as TResult1);
    } catch (err) {
      if (onrejected) return onrejected(err);
      throw err;
    }
  }
}

export class FirestoreModel<T extends { id: string }> {
  constructor(public readonly collectionName: string) {}

  private col() {
    return firestore.collection(this.collectionName);
  }

  public findOne(filter: QueryFilter = {}): FirestoreQuery<T | null> {
    return new FirestoreQuery<T | null>(this, filter, true);
  }

  public find(filter: QueryFilter = {}): FirestoreQuery<T[]> {
    return new FirestoreQuery<T[]>(this, filter, false);
  }

  public async create(data: T | any): Promise<T> {
    const docId = data.id || `doc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const record = {
      ...data,
      id: docId,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.col().doc(docId).set(record);
    return record;
  }

  public async insertMany(items: any[]): Promise<T[]> {
    const inserted: T[] = [];
    for (const item of items) {
      const res = await this.create(item);
      inserted.push(res);
    }
    return inserted;
  }

  public async updateOne(filter: QueryFilter, update: any): Promise<boolean> {
    const docs = await this.findWithSortLimit({ filter });
    const doc = docs[0];
    if (!doc) return false;

    const payload = update.$set ? { ...update.$set } : { ...update };
    if (update.$inc) {
      for (const [k, v] of Object.entries(update.$inc)) {
        payload[k] = ((doc as any)[k] || 0) + (v as number);
      }
    }

    payload.updatedAt = new Date().toISOString();
    await this.col().doc(doc.id).set({ ...doc, ...payload }, { merge: true });
    return true;
  }

  public async findOneAndUpdate(filter: QueryFilter, update: any, options?: { new?: boolean }): Promise<T | null> {
    const docs = await this.findWithSortLimit({ filter });
    const doc = docs[0];
    if (!doc) return null;

    const payload = update.$set ? { ...update.$set } : { ...update };
    const merged = { ...doc, ...payload, updatedAt: new Date().toISOString() };
    await this.col().doc(doc.id).set(merged, { merge: true });
    return merged;
  }

  public async deleteMany(filter: QueryFilter = {}): Promise<number> {
    const docs = await this.findWithSortLimit({ filter });
    for (const doc of docs) {
      await this.col().doc(doc.id).delete();
    }
    return docs.length;
  }

  public async countDocuments(filter: QueryFilter = {}): Promise<number> {
    const docs = await this.findWithSortLimit({ filter });
    return docs.length;
  }

  public async findWithSortLimit(options: {
    filter?: QueryFilter;
    sort?: Record<string, 1 | -1>;
    limit?: number;
    skip?: number;
  }): Promise<T[]> {
    const snapshot = await this.col().get();
    const allDocs: T[] = snapshot.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id
    }));

    let results = allDocs.filter(item => this.matchesFilter(item, options.filter || {}));

    if (options.sort) {
      const [field, dir] = Object.entries(options.sort)[0];
      results.sort((a: any, b: any) => {
        const valA = a[field] instanceof Date ? a[field].getTime() : (a[field] ?? 0);
        const valB = b[field] instanceof Date ? b[field].getTime() : (b[field] ?? 0);
        if (valA === valB) return 0;
        return dir === -1 ? (valA < valB ? 1 : -1) : (valA > valB ? 1 : -1);
      });
    }

    if (options.skip) {
      results = results.slice(options.skip);
    }

    if (options.limit) {
      results = results.slice(0, options.limit);
    }

    return results;
  }

  private matchesFilter(item: any, filter: QueryFilter): boolean {
    for (const [key, expected] of Object.entries(filter)) {
      if (expected === undefined) continue;

      const actual = item[key];

      if (expected instanceof RegExp) {
        if (!expected.test(String(actual || ''))) return false;
      } else if (typeof expected === 'object' && expected !== null && !Array.isArray(expected)) {
        if (expected.$in) {
          if (!expected.$in.includes(actual)) return false;
        }
        if (expected.$nin) {
          if (expected.$nin.includes(actual)) return false;
        }
        if (expected.$gt !== undefined && !(actual > expected.$gt)) return false;
        if (expected.$gte !== undefined && !(actual >= expected.$gte)) return false;
        if (expected.$lt !== undefined && !(actual < expected.$lt)) return false;
        if (expected.$lte !== undefined && !(actual <= expected.$lte)) return false;
        if (expected.$ne !== undefined && actual === expected.$ne) return false;
      } else if (key === '$or' && Array.isArray(expected)) {
        const matchAny = expected.some(subFilter => this.matchesFilter(item, subFilter));
        if (!matchAny) return false;
      } else {
        if (actual !== expected) return false;
      }
    }
    return true;
  }
}
