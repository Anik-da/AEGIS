/**
 * AEGIS COMMERCE — Frontend API Client
 * Connects the cinematic e-commerce frontend to the authoritative AEGIS backend.
 */

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

class ApiClient {
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('aegis_access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const sessionId = localStorage.getItem('aegis_session_id');
    if (sessionId) {
      headers['x-session-id'] = sessionId;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers as Record<string, string> || {})
      }
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error?.message || `HTTP ${res.status}: Request failed`);
    }
    return data.data;
  }

  // 1. AUTHENTICATION
  public auth = {
    register: (payload: { name: string; email: string; password: string }) =>
      this.request<{ user: any; tokens: { accessToken: string; refreshToken: string } }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    login: async (payload: { email: string; password: string }) => {
      const data = await this.request<{ user: any; tokens: { accessToken: string; refreshToken: string; sessionId?: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (data.tokens?.accessToken) {
        localStorage.setItem('aegis_access_token', data.tokens.accessToken);
        localStorage.setItem('aegis_refresh_token', data.tokens.refreshToken);
      }
      if (data.tokens?.sessionId) {
        localStorage.setItem('aegis_session_id', data.tokens.sessionId);
      }
      return data;
    },

    me: () => this.request<{ user: any }>('/auth/me'),

    logout: () => {
      localStorage.removeItem('aegis_access_token');
      localStorage.removeItem('aegis_refresh_token');
      return this.request<{ message: string }>('/auth/logout', { method: 'POST' });
    }
  };

  // 2. PRODUCTS & CATALOG
  public products = {
    getProducts: (params: Record<string, any> = {}) => {
      const qs = new URLSearchParams(params).toString();
      return this.request<{ products: any[]; pagination: any }>(`/products${qs ? `?${qs}` : ''}`);
    },

    getProduct: (id: string) =>
      this.request<{ product: any }>(`/products/${id}`),

    search: (query: string) =>
      this.request<{ products: any[] }>(`/products/search?q=${encodeURIComponent(query)}`),

    getCategories: () =>
      this.request<{ categories: any[] }>('/categories'),

    getRecommendations: (id: string) =>
      this.request<{ recommendations: any[] }>(`/products/${id}/recommendations`)
  };

  // 3. CART (Authoritative server-side recalculation)
  public cart = {
    getCart: () =>
      this.request<{ cart: any }>('/cart'),

    addItem: (productId: string, quantity: number = 1) =>
      this.request<{ cart: any }>('/cart/items', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity })
      }),

    updateItem: (productId: string, quantity: number) =>
      this.request<{ cart: any }>(`/cart/items/${productId}`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity })
      }),

    removeItem: (productId: string) =>
      this.request<{ cart: any }>(`/cart/items/${productId}`, {
        method: 'DELETE'
      }),

    recalculate: () =>
      this.request<{ cart: any }>('/cart/recalculate', {
        method: 'POST'
      })
  };

  // 4. CHECKOUT & ORDERS
  public checkout = {
    validate: (claimedTotal?: number) =>
      this.request<{ allowed: boolean; riskScore: number; checks: any[]; explanation: string }>('/checkout/validate', {
        method: 'POST',
        body: JSON.stringify({ clientClaimedTotal: claimedTotal })
      }),

    placeOrder: (shippingAddress: any, intentContractId?: string) =>
      this.request<{ order: any }>('/orders', {
        method: 'POST',
        body: JSON.stringify({ shippingAddress, intentContractId })
      }),

    getOrders: () =>
      this.request<{ orders: any[] }>('/orders'),

    getOrderById: (id: string) =>
      this.request<{ order: any }>(`/orders/${id}`)
  };

  // 5. INTENTGUARD
  public intent = {
    analyze: (text: string) =>
      this.request<{ intentContract: any }>('/intent/analyze', {
        method: 'POST',
        body: JSON.stringify({ text })
      }),

    match: (intentContract: any, product: any) =>
      this.request<{ matchScore: number; hardConstraintViolations: string[]; preferenceMatches: string[]; reasons: string[]; recommendation: string }>('/intent/match', {
        method: 'POST',
        body: JSON.stringify({ intentContract, product })
      }),

    recordEvent: (type: string, payload: any) =>
      this.request<{ event: any }>('/intent/events', {
        method: 'POST',
        body: JSON.stringify({ type, payload })
      }),

    getCurrent: () =>
      this.request<{ intentContract: any }>('/intent/current'),

    getDrift: () =>
      this.request<{ driftDetected: boolean; driftScore: number; originalBudget: number; currentTotal: number; exceededBy: number; explanation: string }>('/intent/drift'),

    getTimeline: () =>
      this.request<{ events: any[] }>('/intent/timeline')
  };

  // 6. SECURITY & TAMPERGUARD
  public security = {
    reportTamper: (payload: { type: string; resource: string; observedValue: any; expectedValue?: any }) =>
      this.request<{ tampered: boolean; severity: string; serverDecision: string; explanation: string }>('/security/tamper-event', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    getEvents: (limit: number = 30) =>
      this.request<{ events: any[] }>(`/security/events?limit=${limit}`),

    getThreats: () =>
      this.request<{ threats: any[] }>('/security/threats'),

    getTamperEvents: () =>
      this.request<{ tamperEvents: any[] }>('/security/tamper-events'),

    getAttackChains: () =>
      this.request<{ isAttackChain: boolean; stages: string[]; confidence: number; primaryHypothesis: string }>('/security/attack-chains')
  };

  // 7. AEGIS CONTROL CENTER
  public aegis = {
    getOverview: () =>
      this.request<any>('/aegis/overview'),

    getSecurityScore: () =>
      this.request<{ overallScore: number; grade: string; metrics: any; statusSummary: string }>('/aegis/security-score'),

    getEvents: () =>
      this.request<{ events: any[] }>('/aegis/events')
  };

  // 8. HEALGUARD
  public heal = {
    analyze: (payload: { filePath: string; code: string; error: string; context?: string }) =>
      this.request<{ analysis: any }>('/heal/analyze', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    generatePatch: (payload: { problem: string; code: string; analysis: any }) =>
      this.request<{ patchId: string; patch: string; explanation: string }>('/heal/generate-patch', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    verifyPatch: (payload: { patchId: string; candidatePatch: string; filePath?: string; rootCause?: string }) =>
      this.request<{ verification: any; stagedVersion: string }>('/heal/verify-patch', {
        method: 'POST',
        body: JSON.stringify(payload)
      }),

    rollback: (reason?: string) =>
      this.request<{ previousVersion: string; failedVersion: string; restored: boolean }>('/heal/rollback', {
        method: 'POST',
        body: JSON.stringify({ reason })
      }),

    getVersions: () =>
      this.request<any>('/heal/versions')
  };

  // 9. DEMO ACTIONS
  public demo = {
    triggerIntentDrift: () =>
      this.request<any>('/demo/intent-drift', { method: 'POST' }),

    triggerTamper: () =>
      this.request<any>('/demo/tamper', { method: 'POST' }),

    triggerAttackChain: () =>
      this.request<any>('/demo/attack-chain', { method: 'POST' }),

    triggerHeal: () =>
      this.request<any>('/demo/heal', { method: 'POST' }),

    triggerRollback: () =>
      this.request<any>('/demo/rollback', { method: 'POST' })
  };
}

export const api = new ApiClient();
export default api;
