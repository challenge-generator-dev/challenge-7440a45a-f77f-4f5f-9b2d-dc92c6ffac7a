import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from '../src/infrastructure/controllers/order.controller';
import { CreateOrderUseCase } from '../src/application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '../src/application/use-cases/get-order.usecase';
import { UpdateOrderUseCase } from '../src/application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '../src/application/use-cases/delete-order.usecase';
import { Order } from '../src/domain/entities/order.entity';
import { CreateOrderDto } from '../src/infrastructure/dto/create-order.dto';
import { UpdateOrderDto } from '../src/infrastructure/dto/update-order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let createOrderUseCase: CreateOrderUseCase;
  let getOrderUseCase: GetOrderUseCase;
  let updateOrderUseCase: UpdateOrderUseCase;
  let deleteOrderUseCase: DeleteOrderUseCase;

  const mockOrder: Order = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    customerId: 'customer-123',
    products: ['product-1', 'product-2'],
    totalAmount: 150.00,
    status: 'PENDING',
    createdAt: new Date('2024-01-15T10:00:00Z'),
    updatedAt: new Date('2024-01-15T10:00:00Z'),
    isPaid: false,
  };

  const mockCreateOrderUseCase = {
    execute: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockGetOrderUseCase = {
    execute: jest.fn().mockResolvedValue(mockOrder),
  };

  const mockUpdateOrderUseCase = {
    execute: jest.fn().mockResolvedValue({ ...mockOrder, status: 'COMPLETED' }),
  };

  const mockDeleteOrderUseCase = {
    execute: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: CreateOrderUseCase, useValue: mockCreateOrderUseCase },
        { provide: GetOrderUseCase, useValue: mockGetOrderUseCase },
        { provide: UpdateOrderUseCase, useValue: mockUpdateOrderUseCase },
        { provide: DeleteOrderUseCase, useValue: mockDeleteOrderUseCase },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    createOrderUseCase = module.get<CreateOrderUseCase>(CreateOrderUseCase);
    getOrderUseCase = module.get<GetOrderUseCase>(GetOrderUseCase);
    updateOrderUseCase = module.get<UpdateOrderUseCase>(UpdateOrderUseCase);
    deleteOrderUseCase = module.get<DeleteOrderUseCase>(DeleteOrderUseCase);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('debería crear una orden exitosamente', async () => {
      const createOrderDto: CreateOrderDto = {
        customerId: 'customer-123',
        products: ['product-1', 'product-2'],
        totalAmount: 150.00,
      };

      const result = await controller.createOrder(createOrderDto);

      expect(createOrderUseCase.execute).toHaveBeenCalledWith({
        customerId: 'customer-123',
        products: ['product-1', 'product-2'],
        totalAmount: 150.00,
      });
      expect(result).toEqual(mockOrder);
    });

    it('debería manejar errores al crear orden', async () => {
      jest.spyOn(mockCreateOrderUseCase, 'execute').mockRejectedValueOnce(new Error('Error de creación'));
      const createOrderDto: CreateOrderDto = {
        customerId: 'customer-123',
        products: ['product-1'],
        totalAmount: 50.00,
      };

      await expect(controller.createOrder(createOrderDto)).rejects.toThrow('Error de creación');
    });
  });

  describe('getOrder', () => {
    it('debería obtener una orden por id', async () => {
      const result = await controller.getOrder(mockOrder.id);

      expect(getOrderUseCase.execute).toHaveBeenCalledWith(mockOrder.id);
      expect(result).toEqual(mockOrder);
    });

    it('debería retornar null si la orden no existe', async () => {
      jest.spyOn(mockGetOrderUseCase, 'execute').mockResolvedValueOnce(null);

      const result = await controller.getOrder('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('updateOrder', () => {
    it('debería actualizar una orden exitosamente', async () => {
      const updateOrderDto: UpdateOrderDto = { customerId: 'new-customer' };
      const updatedOrder = { ...mockOrder, customerId: 'new-customer', status: 'COMPLETED' };
      jest.spyOn(mockUpdateOrderUseCase, 'execute').mockResolvedValueOnce(updatedOrder);

      const result = await controller.updateOrder(mockOrder.id, updateOrderDto);

      expect(updateOrderUseCase.execute).toHaveBeenCalledWith(mockOrder.id, { customerId: 'new-customer' });
      expect(result).toEqual(updatedOrder);
    });

    it('debería manejar errores de validación al actualizar', async () => {
      jest.spyOn(mockUpdateOrderUseCase, 'execute').mockRejectedValueOnce(new Error('Customer inválido'));
      const updateOrderDto: UpdateOrderDto = { customerId: 'invalid-customer' };

      await expect(controller.updateOrder(mockOrder.id, updateOrderDto)).rejects.toThrow('Customer inválido');
    });
  });

  describe('deleteOrder', () => {
    it('debería eliminar una orden exitosamente', async () => {
      await controller.deleteOrder(mockOrder.id);

      expect(deleteOrderUseCase.execute).toHaveBeenCalledWith(mockOrder.id);
    });

    it('debería manejar errores al eliminar orden', async () => {
      jest.spyOn(mockDeleteOrderUseCase, 'execute').mockRejectedValueOnce(new Error('Orden no encontrada'));

      await expect(controller.deleteOrder(mockOrder.id)).rejects.toThrow('Orden no encontrada');
    });
  });
});