import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export interface CreateOrderDto {
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface UpdateOrderDto {
  customerId?: string;
  items?: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total?: number;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  notes?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface OrderApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

class OrderService {
  private readonly client: AxiosInstance;
  private static readonly BASE_URL: string = import.meta.env?.VITE_API_URL || 'http://localhost:3000';

  constructor() {
    this.client = axios.create({
      baseURL: OrderService.BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<OrderApiError>) => {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const response: AxiosResponse<Order> = await this.client.post<Order>('/orders', data);
    return response.data;
  }

  async getOrder(id: string): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('Order ID is required');
    }
    const response: AxiosResponse<Order> = await this.client.get<Order>(`/orders/${encodeURIComponent(id)}`);
    return response.data;
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<Order> {
    if (!id || id.trim() === '') {
      throw new Error('Order ID is required');
    }
    if (!data || Object.keys(data).length === 0) {
      throw new Error('Update data is required');
    }
    const response: AxiosResponse<Order> = await this.client.put<Order>(
      `/orders/${encodeURIComponent(id)}`,
      data
    );
    return response.data;
  }

  async deleteOrder(id: string): Promise<void> {
    if (!id || id.trim() === '') {
      throw new Error('Order ID is required');
    }
    await this.client.delete(`/orders/${encodeURIComponent(id)}`);
  }

  async getAllOrders(params?: {
    limit?: number;
    offset?: number;
    status?: Order['status'];
    customerId?: string;
  }): Promise<{ orders: Order[]; total: number }> {
    const searchParams = new URLSearchParams();
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.customerId) searchParams.append('customerId', params.customerId);

    const queryString = searchParams.toString();
    const url = queryString ? `/orders?${queryString}` : '/orders';
    const response: AxiosResponse<{ orders: Order[]; total: number }> = await this.client.get(url);
    return response.data;
  }
}

export const orderService = new OrderService();
export default OrderService;