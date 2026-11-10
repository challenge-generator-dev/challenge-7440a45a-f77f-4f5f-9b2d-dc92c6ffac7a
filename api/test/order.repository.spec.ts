import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { OrderDynamoDBRepository } from '../src/infrastructure/repositories/order-dynamodb.repository';
import { Order } from '../src/domain/entities/order.entity';
import { OrderRepository } from '../src/domain/repositories/order.repository';

describe('OrderDynamoDBRepository', () => {
  let repository: OrderRepository;
  let mockDynamoDB: any;
  let mockConfigService: ConfigService;

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

  beforeEach(async () => {
    mockDynamoDB = {
      put: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) }),
      get: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Item: mockOrder }) }),
      update: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({ Attributes: mockOrder }) }),
      delete: jest.fn().mockReturnValue({ promise: jest.fn().mockResolvedValue({}) }),
    };

    mockConfigService = new ConfigService({
      DYNAMODB_TABLE_NAME: 'orders',
      AWS_REGION: 'us-east-1',
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderDynamoDBRepository,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    repository = module.get<OrderRepository>(OrderDynamoDBRepository);
  });

  it('debería estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('debería crear una orden en DynamoDB', async () => {
      const result = await repository.create(mockOrder);

      expect(mockDynamoDB.put).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Item: mockOrder,
        }),
      );
      expect(result).toEqual(mockOrder);
    });

    it('debería manejar errores al crear orden', async () => {
      mockDynamoDB.put.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error('DynamoDB error')),
      });

      await expect(repository.create(mockOrder)).rejects.toThrow('DynamoDB error');
    });
  });

  describe('findById', () => {
    it('debería obtener una orden por id', async () => {
      const result = await repository.findById(mockOrder.id);

      expect(mockDynamoDB.get).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Key: { id: mockOrder.id },
        }),
      );
      expect(result).toEqual(mockOrder);
    });

    it('debería retornar null si la orden no existe', async () => {
      mockDynamoDB.get.mockReturnValueOnce({
        promise: jest.fn().mockResolvedValue({}),
      });

      const result = await repository.findById('non-existent-id');

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debería actualizar una orden existente', async () => {
      const updateData: Partial<Order> = { status: 'COMPLETED', isPaid: true };

      const result = await repository.update(mockOrder.id, updateData);

      expect(mockDynamoDB.update).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Key: { id: mockOrder.id },
        }),
      );
      expect(result).toEqual(mockOrder);
    });

    it('debería manejar errores al actualizar', async () => {
      mockDynamoDB.update.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error('Update failed')),
      });

      await expect(repository.update(mockOrder.id, { status: 'COMPLETED' })).rejects.toThrow('Update failed');
    });
  });

  describe('delete', () => {
    it('debería eliminar una orden por id', async () => {
      await repository.delete(mockOrder.id);

      expect(mockDynamoDB.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          TableName: 'orders',
          Key: { id: mockOrder.id },
        }),
      );
    });

    it('debería manejar errores al eliminar', async () => {
      mockDynamoDB.delete.mockReturnValueOnce({
        promise: jest.fn().mockRejectedValueOnce(new Error('Delete failed')),
      });

      await expect(repository.delete(mockOrder.id)).rejects.toThrow('Delete failed');
    });
  });
});