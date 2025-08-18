
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'merchant' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  owner: string;
  ownerId: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  status: 'pending' | 'active' | 'rejected' | 'suspended';
  logo?: string;
  coverImage?: string;
  rating: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  registrationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  images: string[];
  storeId: string;
  storeName: string;
  status: 'active' | 'inactive' | 'draft';
  specifications?: Record<string, any>;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  storeId: string;
  storeName: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  userEmail: string;
  storeId?: string;
  storeName?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'technical' | 'billing' | 'general' | 'store_approval';
  assignedTo?: string;
  responses: TicketResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface TicketResponse {
  id: string;
  message: string;
  userId: string;
  userName: string;
  userRole: string;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalStores: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingStores: number;
  openTickets: number;
  monthlyGrowth: {
    users: number;
    stores: number;
    orders: number;
    revenue: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    pages: number;
    limit: number;
  };
}
