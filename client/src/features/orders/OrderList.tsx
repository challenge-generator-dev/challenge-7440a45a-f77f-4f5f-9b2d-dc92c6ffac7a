import { useState } from 'react';
import { Order } from '../../shared/types/order.types';
import { useOrders } from '../../shared/hooks/useOrders';
import { Button } from '../../shared/components/Button';
import { OrderForm } from './OrderForm';

interface OrderListProps {
  onCreateClick: () => void;
}

export function OrderList({ onCreateClick }: OrderListProps) {
  const { orders, isLoading, error, deleteOrder, fetchOrders } = useOrders();
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta orden?')) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteOrder(id);
      await fetchOrders();
    } catch (err) {
      console.error('Error al eliminar la orden:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingOrder(null);
  };

  const handleFormSuccess = async () => {
    handleFormClose();
    await fetchOrders();
  };

  if (isLoading && orders.length === 0) {
    return (
      <div className="order-list-container">
        <div className="loading-state">
          <div className="spinner" aria-label="Cargando órdenes"></div>
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const errorMessage = typeof error === 'object' && error !== null && 'message' in error 
      ? (error as { message: string }).message 
      : String(error);
    return (
      <div className="order-list-container">
        <div className="error-state" role="alert">
          <p>Error al cargar las órdenes: {errorMessage}</p>
          <Button onClick={fetchOrders} variant="primary">
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      processing: 'Procesando',
      completed: 'Completado',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  };

  return (
    <div className="order-list-container">
      <header className="order-list-header">
        <h1>Gestión de Órdenes</h1>
        <Button onClick={onCreateClick} variant="primary">
          Nueva Orden
        </Button>
      </header>

      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No hay órdenes disponibles.</p>
          <Button onClick={onCreateClick} variant="secondary">
            Crear primera orden
          </Button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="order-table" role="table" aria-label="Lista de órdenes">
            <thead>
              <tr>
                <th scope="col">Número</th>
                <th scope="col">Cliente</th>
                <th scope="col">Productos</th>
                <th scope="col">Total</th>
                <th scope="col">Estado</th>
                <th scope="col">Fecha</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="order-row">
                  <td data-label="Número">{order.orderNumber}</td>
                  <td data-label="Cliente">{order.customer.name}</td>
                  <td data-label="Productos">
                    {order.items.map((item) => (
                      <div key={item.id} className="item-summary">
                        {item.productName} x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td data-label="Total">${order.total.toFixed(2)}</td>
                  <td data-label="Estado">
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td data-label="Fecha">
                    {new Date(order.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td data-label="Acciones" className="actions-cell">
                    <div className="action-buttons">
                      <Button
                        onClick={() => handleEdit(order)}
                        variant="secondary"
                        size="sm"
                        disabled={deletingId === order.id}
                        aria-label={`Editar orden ${order.orderNumber}`}
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => handleDelete(order.id)}
                        variant="danger"
                        size="sm"
                        disabled={deletingId === order.id}
                        aria-label={`Eliminar orden ${order.orderNumber}`}
                      >
                        {deletingId === order.id ? 'Eliminando...' : 'Eliminar'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <div className="modal-overlay" onClick={handleFormClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingOrder ? 'Editar Orden' : 'Nueva Orden'}</h2>
              <button
                className="close-button"
                onClick={handleFormClose}
                aria-label="Cerrar formulario"
              >
                &times;
              </button>
            </div>
            <OrderForm
              order={editingOrder}
              onSuccess={handleFormSuccess}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}