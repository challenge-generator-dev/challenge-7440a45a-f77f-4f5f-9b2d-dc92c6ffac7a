import { useState, useEffect, FormEvent } from 'react';
import { Order, Customer, OrderItem, OrderStatus } from '../../shared/types/order.types';
import { orderService, CreateOrderDto, UpdateOrderDto } from '../../services/order.service';
import { Button } from '../../shared/components/Button';

interface OrderFormProps {
  order?: Order | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function OrderForm({ order, onSuccess, onCancel }: OrderFormProps) {
  const [formData, setFormData] = useState<{
    customer: Omit<Customer, 'id'>;
    items: Array<{ productId: string; productName: string; quantity: number; unitPrice: number }>;
    notes?: string;
  }>({
    customer: { name: '', email: '', phone: '', address: undefined },
    items: [{ productId: '', productName: '', quantity: 1, unitPrice: 0 }],
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (order) {
      setFormData({
        customer: {
          name: order.customer.name,
          email: order.customer.email,
          phone: order.customer.phone || '',
          address: order.customer.address,
        },
        items: order.items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        notes: order.notes || '',
      });
    }
  }, [order]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.customer.name.trim()) {
      newErrors.customerName = 'El nombre del cliente es obligatorio';
    } else if (formData.customer.name.trim().length < 2) {
      newErrors.customerName = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.customer.email.trim()) {
      newErrors.customerEmail = 'El email del cliente es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customer.email)) {
      newErrors.customerEmail = 'El email no es válido';
    }

    const firstItem = formData.items[0];
    if (!firstItem.productName.trim()) {
      newErrors.productName = 'El nombre del producto es obligatorio';
    }

    if (firstItem.quantity < 1) {
      newErrors.quantity = 'La cantidad debe ser al menos 1';
    } else if (!Number.isInteger(firstItem.quantity)) {
      newErrors.quantity = 'La cantidad debe ser un número entero';
    }

    if (firstItem.unitPrice < 0) {
      newErrors.price = 'El precio no puede ser negativo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value, name } = e.target;
    
    if (field.startsWith('customer.')) {
      const customerField = field.replace('customer.', '') as keyof Customer;
      setFormData((prev) => ({
        ...prev,
        customer: {
          ...prev.customer,
          [customerField]: value,
        },
      }));
    } else if (field.startsWith('item.')) {
      const itemField = field.replace('item.', '') as keyof typeof formData.items[0];
      setFormData((prev) => ({
        ...prev,
        items: prev.items.map((item, idx) =>
          idx === 0
            ? {
                ...item,
                [itemField]: itemField === 'quantity' 
                  ? parseInt(value) || 0
                  : itemField === 'unitPrice'
                  ? parseFloat(value) || 0
                  : value,
              }
            : item
        ),
      }));
    } else if (field === 'notes') {
      setFormData((prev) => ({ ...prev, notes: value }));
    }

    if (errors[field] || errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const firstItem = formData.items[0];
      const total = firstItem.quantity * firstItem.unitPrice;
      const itemsWithTotal = [
        {
          productId: firstItem.productId,
          quantity: firstItem.quantity,
          price: firstItem.unitPrice,
        },
      ];

      if (order?.id) {
        const updateData: UpdateOrderDto = {
          status: order.status as 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled',
          items: itemsWithTotal,
        };
        await orderService.updateOrder(order.id, updateData);
      } else {
        const createData: CreateOrderDto = {
          customerId: formData.customer.email,
          items: itemsWithTotal,
          total: total,
        };
        await orderService.createOrder(createData);
      }
      onSuccess();
    } catch (err) {
      console.error('Error al guardar la orden:', err);
      setSubmitError(
        err instanceof Error ? err.message : 'Error al guardar la orden. Intente de nuevo.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const firstItem = formData.items[0];
  const total = firstItem.quantity * firstItem.unitPrice;

  return (
    <form onSubmit={handleSubmit} className="order-form" noValidate>
      {submitError && (
        <div className="form-error" role="alert">
          {submitError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="customerName">Nombre del Cliente *</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customer.name}
          onChange={(e) => handleChange(e, 'customer.name')}
          className={errors.customerName ? 'input-error' : ''}
          disabled={isSubmitting}
          aria-invalid={!!errors.customerName}
          aria-describedby={errors.customerName ? 'customerName-error' : undefined}
        />
        {errors.customerName && (
          <span id="customerName-error" className="error-message" role="alert">
            {errors.customerName}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail">Email del Cliente *</label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customer.email}
          onChange={(e) => handleChange(e, 'customer.email')}
          className={errors.customerEmail ? 'input-error' : ''}
          disabled={isSubmitting}
          aria-invalid={!!errors.customerEmail}
          aria-describedby={errors.customerEmail ? 'customerEmail-error' : undefined}
        />
        {errors.customerEmail && (
          <span id="customerEmail-error" className="error-message" role="alert">
            {errors.customerEmail}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="productName">Nombre del Producto *</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={firstItem.productName}
          onChange={(e) => handleChange(e, 'item.productName')}
          className={errors.productName ? 'input-error' : ''}
          disabled={isSubmitting}
          aria-invalid={!!errors.productName}
          aria-describedby={errors.productName ? 'productName-error' : undefined}
        />
        {errors.productName && (
          <span id="productName-error" className="error-message" role="alert">
            {errors.productName}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="quantity">Cantidad *</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={firstItem.quantity}
            onChange={(e) => handleChange(e, 'item.quantity')}
            min="1"
            step="1"
            className={errors.quantity ? 'input-error' : ''}
            disabled={isSubmitting}
            aria-invalid={!!errors.quantity}
            aria-describedby={errors.quantity ? 'quantity-error' : undefined}
          />
          {errors.quantity && (
            <span id="quantity-error" className="error-message" role="alert">
              {errors.quantity}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio Unitario ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={firstItem.unitPrice}
            onChange={(e) => handleChange(e, 'item.unitPrice')}
            min="0"
            step="0.01"
            className={errors.price ? 'input-error' : ''}
            disabled={isSubmitting}
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? 'price-error' : undefined}
          />
          {errors.price && (
            <span id="price-error" className="error-message" role="alert">
              {errors.price}
            </span>
          )}
        </div>
      </div>

      <div className="form-group total-display">
        <label>Total:</label>
        <span className="total-value">${total.toFixed(2)}</span>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notas</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes || ''}
          onChange={(e) => handleChange(e, 'notes')}
          disabled={isSubmitting}
          rows={3}
        />
      </div>

      {order && (
        <div className="form-group">
          <label htmlFor="status">Estado</label>
          <select
            id="status"
            name="status"
            value={order.status}
            disabled
            aria-label="Estado de la orden"
          >
            <option value="pending">Pendiente</option>
            <option value="processing">Procesando</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>
      )}

      <div className="form-actions">
        <Button
          type="button"
          onClick={onCancel}
          variant="secondary"
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Guardando...'
            : order
            ? 'Actualizar Orden'
            : 'Crear Orden'}
        </Button>
      </div>
    </form>
  );
}