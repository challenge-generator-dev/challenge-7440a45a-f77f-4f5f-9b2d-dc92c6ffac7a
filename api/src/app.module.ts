import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderController } from '@infrastructure/controllers/order.controller';
import { CreateOrderUseCase } from '@application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@application/use-cases/get-order.usecase';
import { UpdateOrderUseCase } from '@application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/use-cases/delete-order.usecase';
import { OrderRepository } from '@domain/repositories/order.repository';
import { OrderDynamoDBRepository } from '@infrastructure/repositories/order-dynamodb.repository';
import { DynamoDBConfigModule } from '@infrastructure/config/dynamodb.config';

export const ORDER_REPOSITORY_TOKEN = 'ORDER_REPOSITORY';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.production', '.env.development', '.env'],
    }),
    DynamoDBConfigModule,
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: ORDER_REPOSITORY_TOKEN,
      useClass: OrderDynamoDBRepository,
    },
    CreateOrderUseCase,
    GetOrderUseCase,
    UpdateOrderUseCase,
    DeleteOrderUseCase,
  ],
  exports: [ORDER_REPOSITORY_TOKEN],
})
export class AppModule {}