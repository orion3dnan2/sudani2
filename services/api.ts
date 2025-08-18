
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-api-domain.com/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      defaultHeaders.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'حدث خطأ في الطلب',
        };
      }

      return {
        success: true,
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        error: 'خطأ في الاتصال بالخادم',
      };
    }
  }

  // Auth APIs
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  // Store APIs
  async getStores(params?: any) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/stores${queryParams ? `?${queryParams}` : ''}`);
  }

  async getStore(id: string) {
    return this.request(`/stores/${id}`);
  }

  async createStore(storeData: any) {
    return this.request('/stores', {
      method: 'POST',
      body: JSON.stringify(storeData),
    });
  }

  async updateStore(id: string, storeData: any) {
    return this.request(`/stores/${id}`, {
      method: 'PUT',
      body: JSON.stringify(storeData),
    });
  }

  async deleteStore(id: string) {
    return this.request(`/stores/${id}`, {
      method: 'DELETE',
    });
  }

  // Product APIs
  async getProducts(params?: any) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/products${queryParams ? `?${queryParams}` : ''}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Order APIs
  async getOrders(params?: any) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/orders${queryParams ? `?${queryParams}` : ''}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(orderData: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Admin APIs
  async getAdminStats() {
    return this.request('/admin/stats');
  }

  async getAdminUsers(params?: any) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/admin/users${queryParams ? `?${queryParams}` : ''}`);
  }

  async updateUserStatus(userId: string, status: string) {
    return this.request(`/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Support APIs
  async getSupportTickets(params?: any) {
    const queryParams = new URLSearchParams(params).toString();
    return this.request(`/support/tickets${queryParams ? `?${queryParams}` : ''}`);
  }

  async createSupportTicket(ticketData: any) {
    return this.request('/support/tickets', {
      method: 'POST',
      body: JSON.stringify(ticketData),
    });
  }

  async updateTicketStatus(id: string, status: string) {
    return this.request(`/support/tickets/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Upload APIs
  async uploadImage(imageFile: any) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.request('/upload/image', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    });
  }
}

export const apiService = new ApiService();
export default apiService;
