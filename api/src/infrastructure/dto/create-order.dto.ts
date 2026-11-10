import { IsString, IsArray, IsNumber, IsNotEmpty, Min, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Identificador único del cliente que realiza la orden',
    example: 'cust_12345',
    type: String
  })
  @IsString({ message: 'El ID del cliente debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El ID del cliente es obligatorio' })
  customerId: string;

  @ApiProperty({
    description: 'Lista de productos incluidos en la orden',
    example: ['prod_001', 'prod_002', 'prod_003'],
    type: [String],
    minItems: 1
  })
  @IsArray({ message: 'Los productos deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'La orden debe contener al menos un producto' })
  @ValidateNested({ each: true })
  @IsString({ each: true, message: 'Cada producto debe ser una cadena de texto' })
  @Type(() => String)
  products: string[];

  @ApiProperty({
    description: 'Monto total de la orden en centavos',
    example: 19999,
    type: Number,
    minimum: 0
  })
  @IsNumber({}, { message: 'El monto total debe ser un número' })
  @Min(0, { message: 'El monto total no puede ser negativo' })
  totalAmount: number;

  @ApiPropertyOptional({
    description: 'Estado inicial de la orden',
    example: 'PENDING',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  })
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  status?: string;
}