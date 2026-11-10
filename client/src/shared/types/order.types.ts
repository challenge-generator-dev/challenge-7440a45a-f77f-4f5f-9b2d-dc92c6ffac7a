export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDto {
  customer: Omit<Customer, 'id'>;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
  shippingAddress?: Customer['address'];
}

export interface UpdateOrderDto {
  status?: OrderStatus;
  notes?: string;
  items?: Array<{
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
  }>;
  shippingAddress?: Customer['address'];
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}

export interface OrderApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface OrderFilterParams {
  status?: OrderStatus;
  customerId?: string;
  startDate?: string;
  endDate?: string;
  minTotal?: number;
  maxTotal?: number;
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'total' | 'orderNumber';
  sortOrder?: 'asc' | 'desc';
}

export interface OrderValidationError {
  field: string;
  message: string;
}

export interface CreateOrderResponse {
  success: boolean;
  order?: Order;
  errors?: OrderValidationError[];
}

export interface UpdateOrderResponse {
  success: boolean;
  order?: Order;
  errors?: OrderValidationError[];
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pendiente',
  processing: 'Procesando',
  completed: 'Completado',
  cancelled: 'Cancelado',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'yellow',
  processing: 'blue',
  completed: 'green',
  cancelled: 'red',
};