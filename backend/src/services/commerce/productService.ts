import { ProductModel, IProductDocument } from '../../models/Product.js';
import { CategoryModel } from '../../models/Category.js';

export interface ProductQueryFilter {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
}

export class ProductService {
  public async getProducts(filter: ProductQueryFilter) {
    const query: any = { isActive: true };

    if (filter.category) {
      query.category = { $regex: new RegExp(`^${filter.category}$`, 'i') };
    }
    if (filter.brand) {
      query.brand = { $regex: new RegExp(`^${filter.brand}$`, 'i') };
    }
    if (filter.inStock !== undefined) {
      query.stock = filter.inStock ? { $gt: 0 } : 0;
    }
    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      query.price = {};
      if (filter.minPrice !== undefined) query.price.$gte = filter.minPrice;
      if (filter.maxPrice !== undefined) query.price.$lte = filter.maxPrice;
    }
    if (filter.search) {
      query.$or = [
        { name: { $regex: filter.search, $options: 'i' } },
        { description: { $regex: filter.search, $options: 'i' } },
        { tags: { $in: [new RegExp(filter.search, 'i')] } }
      ];
    }

    let sortOption: any = { createdAt: -1 };
    if (filter.sortBy === 'price_asc') sortOption = { price: 1 };
    else if (filter.sortBy === 'price_desc') sortOption = { price: -1 };
    else if (filter.sortBy === 'rating') sortOption = { rating: -1 };

    const page = Math.max(1, filter.page || 1);
    const limit = Math.min(50, Math.max(1, filter.limit || 20));
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      ProductModel.find(query).sort(sortOption).skip(skip).limit(limit),
      ProductModel.countDocuments(query)
    ]);

    return {
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  public async getProductById(id: string) {
    return ProductModel.findOne({ id, isActive: true });
  }

  public async getRecommendations(productId: string) {
    const current = await ProductModel.findOne({ id: productId });
    if (!current) return [];

    return ProductModel.find({
      id: { $ne: productId },
      category: current.category,
      isActive: true
    }).limit(4);
  }

  public async getCategories() {
    return CategoryModel.find({ isActive: true });
  }

  public async createProduct(productData: any) {
    return ProductModel.create(productData);
  }

  public async updateProduct(id: string, updateData: any) {
    return ProductModel.findOneAndUpdate({ id }, updateData, { new: true });
  }

  public async deleteProduct(id: string) {
    return ProductModel.findOneAndUpdate({ id }, { isActive: false }, { new: true });
  }
}

export const productService = new ProductService();
