import { useState, useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  OrderListResponse,
  OrderApiError,
} from '../types/order.types';

interface UseOrdersOptions {
  autoFetch?: boolean;
  baseUrl?: string;
}

interface UseOrdersReturn {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  isFetching: boolean;
  error: OrderApiError | null;
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  createOrder: (data: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, data: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
  clearError: () => void;
  clearCurrentOrder: () => void;
}

export function useOrders(options: UseOrdersOptions = {}): UseOrdersReturn {
  const { autoFetch = true, baseUrl = 'http://localhost:3000' } = options;

  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<OrderApiError | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null);
  }, []);

  const fetchOrders = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/orders`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: OrderListResponse = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      const axiosError = err as AxiosError<OrderApiError>;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Failed to fetch orders';
      setError({
        message: errorMessage,
        status: axiosError.response?.status || 500,
        code: axiosError.code,
      });
    } finally {
      setIsLoading(false);
    }
  }, [baseUrl]);

  const fetchOrderById = useCallback(
    async (id: string): Promise<Order | null> => {
      setIsFetching(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError({
              message: 'Order not found',
              status: 404,
              code: 'NOT_FOUND',
            });
            return null;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order = await response.json();
        setCurrentOrder(data);
        return data;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to fetch order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return null;
      } finally {
        setIsFetching(false);
      }
    },
    [baseUrl]
  );

  const createOrder = useCallback(
    async (data: CreateOrderDto): Promise<Order | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData: OrderApiError = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const createdOrder: Order = await response.json();
        setOrders((prev) => [...prev, createdOrder]);
        return createdOrder;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to create order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  const updateOrder = useCallback(
    async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError({
              message: 'Order not found',
              status: 404,
              code: 'NOT_FOUND',
            });
            return null;
          }
          const errorData: OrderApiError = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const updatedOrder: Order = await response.json();
        setOrders((prev) =>
          prev.map((order) => (order.id === id ? updatedOrder : order))
        );
        if (currentOrder?.id === id) {
          setCurrentOrder(updatedOrder);
        }
        return updatedOrder;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to update order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl, currentOrder]
  );

  const deleteOrder = useCallback(
    async (id: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}/orders/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError({
              message: 'Order not found',
              status: 404,
              code: 'NOT_FOUND',
            });
            return false;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setOrders((prev) => prev.filter((order) => order.id !== id));
        if (currentOrder?.id === id) {
          setCurrentOrder(null);
        }
        return true;
      } catch (err) {
        const axiosError = err as AxiosError<OrderApiError>;
        const errorMessage =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Failed to delete order';
        setError({
          message: errorMessage,
          status: axiosError.response?.status || 500,
          code: axiosError.code,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl, currentOrder]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchOrders();
    }
  }, [autoFetch, fetchOrders]);

  return {
    orders,
    currentOrder,
    isLoading,
    isFetching,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    clearError,
    clearCurrentOrder,
  };
}

export type { UseOrdersOptions, UseOrdersReturn };