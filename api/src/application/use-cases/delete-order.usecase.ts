import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { OrderRepository } from '@domain/repositories/order.repository';
import { Order } from '@domain/entities/order.entity';

@Injectable()
export class DeleteOrderUseCase {
  private readonly logger = new Logger(DeleteOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {
    if (!orderRepository) {
      throw new Error('OrderRepository es requerido para DeleteOrderUseCase');
    }
  }

  async execute(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      this.logger.error('Se intentó eliminar una orden con ID vacío o inválido');
      throw new Error('El ID de la orden es requerido y no puede estar vacío');
    }

    this.logger.log(`Iniciando eliminación de orden con ID: ${id}`);

    const existingOrder = await this.orderRepository.findById(id);

    if (!existingOrder) {
      this.logger.warn(`Orden no encontrada para eliminación: ${id}`);
      throw new NotFoundException(`No se encontró la orden con ID: ${id}`);
    }

    if (existingOrder.isPaid) {
      this.logger.error(`Intento de eliminar orden pagada: ${id}`);
      throw new Error('No se puede eliminar una orden que ya ha sido pagada');
    }

    try {
      await this.orderRepository.delete(id);
      this.logger.log(`Orden eliminada exitosamente: ${id}`);
    } catch (error) {
      this.logger.error(`Error al eliminar la orden ${id}: ${error.message}`);
      throw new Error(`Error al eliminar la orden: ${error.message}`);
    }
  }

  async executeWithValidation(id: string, requesterId: string): Promise<void> {
    if (!requesterId || requesterId.trim().length === 0) {
      throw new Error('El ID del solicitante es requerido para eliminar una orden');
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new NotFoundException(`Orden no encontrada: ${id}`);
    }

    if (order.customerId !== requesterId) {
      this.logger.warn(`Usuario ${requesterId} intentó eliminar orden ${id} que pertenece a ${order.customerId}`);
      throw new Error('No tienes autorización para eliminar esta orden');
    }

    await this.orderRepository.delete(id);
    this.logger.log(`Orden ${id} eliminada por usuario ${requesterId}`);
  }
}