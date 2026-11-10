import { IsString, IsNumber, IsDate, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class Order {
  @ApiProperty({ description: 'Identificador único de la orden', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Identificador del cliente que realizó la orden', example: 'cust-123' })
  @IsString()
  customerId: string;

  @ApiProperty({ description: 'Lista de productos incluidos en la orden', type: [String] })
  @IsString({ each: true })
  products: string[];

  @ApiProperty({ description: 'Monto total de la orden', example: 99.99 })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ description: 'Estado actual de la orden', example: 'pending' })
  @IsString()
  status: string;

  @ApiProperty({ description: 'Fecha de creación de la orden', example: '2024-01-01T00:00:00.000Z' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualización de la orden', example: '2024-01-01T00:00:00.000Z' })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ description: 'Indica si la orden ha sido pagada', example: false })
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  constructor(
    id: string,
    customerId: string,
    products: string[],
    totalAmount: number,
    status: string,
    createdAt: Date,
    updatedAt?: Date,
    isPaid?: boolean
  ) {
    this.id = id;
    this.customerId = customerId;
    this.products = products;
    this.totalAmount = totalAmount;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isPaid = isPaid;
  }
}