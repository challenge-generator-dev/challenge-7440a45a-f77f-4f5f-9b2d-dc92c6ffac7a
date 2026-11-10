import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';

@Injectable()
export class UpdateOrderUseCase {
  private readonly logger = new Logger(UpdateOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    id: string,
    data: {
      customerId?: string;
      products?: string[];
      totalAmount?: number;
      status?: string;
      isPaid?: boolean;
    },
  ): Promise<Order> {
    this.logger.log(`Actualizando orden con ID: ${id}`);

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      this.logger.warn(`Orden no encontrada para actualizar: ${id}`);
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    const updateData: Partial<Order> = {
      updatedAt: new Date(),
    };

    if (data.customerId !== undefined) {
      updateData.customerId = data.customerId;
    }

    if (data.products !== undefined) {
      updateData.products = data.products;
    }

    if (data.totalAmount !== undefined) {
      updateData.totalAmount = data.totalAmount;
    }

    if (data.status !== undefined) {
      if (!this.isValidStatus(data.status)) {
        this.logger.warn(`Estado inválido proporcionado: ${data.status}`);
        throw new Error(`Estado inválido: ${data.status}`);
      }
      updateData.status = data.status;
    }

    if (data.isPaid !== undefined) {
      updateData.isPaid = data.isPaid;
      
      if (data.isPaid && data.status !== 'PAID') {
        updateData.status = 'PAID';
      }
    }

    const updatedOrder = await this.orderRepository.update(id, updateData);
    
    this.logger.log(`Orden actualizada exitosamente: ${updatedOrder.id}, Nuevo estado: ${updatedOrder.status}`);
    
    return updatedOrder;
  }

  private isValidStatus(status: string): boolean {
    const validStatuses = ['PENDING', 'PROCESSING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
    return validStatuses.includes(status);
  }
}