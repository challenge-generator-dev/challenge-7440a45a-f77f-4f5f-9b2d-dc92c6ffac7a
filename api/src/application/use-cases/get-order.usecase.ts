import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';

@Injectable()
export class GetOrderUseCase {
  private readonly logger = new Logger(GetOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order> {
    this.logger.log(`Buscando orden con ID: ${id}`);

    if (!this.isValidOrderId(id)) {
      this.logger.warn(`ID de orden inválido: ${id}`);
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    const order = await this.orderRepository.findById(id);

    if (!order) {
      this.logger.warn(`Orden no encontrada: ${id}`);
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    this.logger.log(`Orden encontrada: ${order.id}, Estado: ${order.status}`);
    
    return order;
  }

  private isValidOrderId(id: string): boolean {
    return typeof id === 'string' && id.trim().length > 0;
  }
}