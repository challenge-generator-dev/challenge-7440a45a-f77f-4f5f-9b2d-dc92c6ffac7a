import { Injectable, Logger } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';

@Injectable()
export class CreateOrderUseCase {
  private readonly logger = new Logger(CreateOrderUseCase.name);

  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(data: {
    customerId: string;
    products: string[];
    totalAmount: number;
  }): Promise<Order> {
    this.logger.log(`Creando orden para cliente: ${data.customerId}`);

    const order = new Order(
      this.generateId(),
      data.customerId,
      data.products,
      data.totalAmount,
      'PENDING',
      new Date(),
    );

    const createdOrder = await this.orderRepository.create(order);
    
    this.logger.log(`Orden creada exitosamente con ID: ${createdOrder.id}`);
    
    return createdOrder;
  }

  private generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `ORD-${timestamp}-${randomPart}`.toUpperCase();
  }
}