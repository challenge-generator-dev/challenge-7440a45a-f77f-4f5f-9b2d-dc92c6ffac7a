import { Injectable } from '@nestjs/common';
import { Order } from '@domain/entities/order.entity';
import { OrderRepository } from '@domain/repositories/order.repository';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';

interface AttributeValueMap {
  [key: string]: any;
}

@Injectable()
export class OrderDynamoDBRepository implements OrderRepository {
  private readonly dynamoDB: DynamoDB.DocumentClient;
  private readonly tableName: string;

  constructor(private readonly configService: ConfigService) {
    this.dynamoDB = new DynamoDB.DocumentClient({
      region: this.configService.get<string>('AWS_REGION', 'us-east-1'),
      endpoint: this.configService.get<string>('DYNAMODB_ENDPOINT', 'http://localhost:8000'),
    });
    this.tableName = this.configService.get<string>('DYNAMODB_TABLE_NAME', 'Orders');
  }

  async create(order: Order): Promise<Order> {
    const now = new Date();
    const orderWithId = {
      ...order,
      id: uuidv4(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: orderWithId as DynamoDB.DocumentClient.AttributeMap,
    };

    await this.dynamoDB.put(params).promise();
    return new Order(
      orderWithId.id,
      orderWithId.customerId,
      orderWithId.products,
      orderWithId.totalAmount,
      orderWithId.status,
      new Date(orderWithId.createdAt),
      new Date(orderWithId.updatedAt),
      orderWithId.isPaid
    );
  }

  async findById(id: string): Promise<Order | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: { id } as DynamoDB.DocumentClient.Key,
    };

    const result = await this.dynamoDB.get(params).promise();
    if (!result.Item) {
      return null;
    }

    return new Order(
      result.Item.id as string,
      result.Item.customerId as string,
      result.Item.products as string[],
      result.Item.totalAmount as number,
      result.Item.status as string,
      new Date(result.Item.createdAt as string),
      result.Item.updatedAt ? new Date(result.Item.updatedAt as string) : undefined,
      result.Item.isPaid as boolean | undefined
    );
  }

  async update(id: string, order: Partial<Order>): Promise<Order> {
    const now = new Date();
    const updateExpressions: string[] = [];
    const expressionAttributeValues: AttributeValueMap = {};
    const expressionAttributeNames: AttributeValueMap = {};

    Object.entries(order).forEach(([key, value]) => {
      if (key !== 'id' && value !== undefined) {
        const updateKey = `#${key}`;
        const valueKey = `:${key}`;
        updateExpressions.push(`${updateKey} = ${valueKey}`);
        expressionAttributeNames[updateKey] = key;
        expressionAttributeValues[valueKey] = value;
      }
    });

    if (updateExpressions.length > 0) {
      updateExpressions.push('#updatedAt = :updatedAt');
      expressionAttributeNames['#updatedAt'] = 'updatedAt';
      expressionAttributeValues[':updatedAt'] = now.toISOString();
    }

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { id } as DynamoDB.DocumentClient.Key,
      UpdateExpression: 'SET ' + updateExpressions.join(', '),
      ExpressionAttributeValues: expressionAttributeValues as DynamoDB.DocumentClient.AttributeMap,
      ExpressionAttributeNames: expressionAttributeNames as DynamoDB.DocumentClient.ExpressionAttributeNameMap,
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDB.update(params).promise();
    if (!result.Attributes) {
      throw new Error('Order not found');
    }

    return new Order(
      result.Attributes.id as string,
      result.Attributes.customerId as string,
      result.Attributes.products as string[],
      result.Attributes.totalAmount as number,
      result.Attributes.status as string,
      new Date(result.Attributes.createdAt as string),
      new Date(result.Attributes.updatedAt as string),
      result.Attributes.isPaid as boolean | undefined
    );
  }

  async delete(id: string): Promise<void> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: { id } as DynamoDB.DocumentClient.Key,
    };

    await this.dynamoDB.delete(params).promise();
  }
}