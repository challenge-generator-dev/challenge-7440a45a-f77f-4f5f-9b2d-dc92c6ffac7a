import { Routes, Route, Navigate } from 'react-router-dom';
import { OrderList } from './features/orders/OrderList';
import { OrderForm } from './features/orders/OrderForm';
import { useOrders } from './shared/hooks/useOrders';
import { useState, useCallback } from 'react';
import { Order, CreateOrderDto, UpdateOrderDto } from './shared/types/order.types';

function App() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const orderHooks = useOrders({ autoFetch: true, baseUrl: 'http://localhost:3000' });

  const handleCreateClick = useCallback(() => {
    setEditingOrder(null);
  }, []);

  const handleOrderSuccess = useCallback(() => {
    setEditingOrder(null);
    orderHooks.fetchOrders();
  }, [orderHooks.fetchOrders]);

  const handleCancelForm = useCallback(() => {
    setEditingOrder(null);
  }, []);

  const handleCreateOrder = useCallback(async (data: CreateOrderDto): Promise<Order | null> => {
    return await orderHooks.createOrder(data);
  }, [orderHooks.createOrder]);

  const handleUpdateOrder = useCallback(async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
    return await orderHooks.updateOrder(id, data);
  }, [orderHooks.updateOrder]);

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <OrderList
              onCreateClick={handleCreateClick}
              onDeleteOrder={orderHooks.deleteOrder}
              onRefresh={orderHooks.fetchOrders}
            />
          }
        />
        <Route
          path="/orders/new"
          element={
            editingOrder ? (
              <Navigate to="/" replace />
            ) : (
              <OrderForm
                order={null}
                onSuccess={handleOrderSuccess}
                onCancel={handleCancelForm}
              />
            )
          }
        />
        <Route
          path="/orders/:id/edit"
          element={
            <OrderForm
              order={editingOrder}
              onSuccess={handleOrderSuccess}
              onCancel={handleCancelForm}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;