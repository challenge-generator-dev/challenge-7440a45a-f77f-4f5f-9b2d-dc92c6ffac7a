import { IsString, IsArray, IsNumber, IsOptional, Min, ArrayMinSize, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Identificador único del cliente asociado a la orden',
    example: 'cust_12345',
    type: String
  })
  @IsOptional()
  @IsString({ message: 'El ID del cliente debe ser una cadena de texto' })
  customerId?: string;

  @ApiPropertyOptional({
    description: 'Lista de productos en la orden',
    example: ['prod_001', 'prod_004'],
    type: [String],
    minItems: 1
  })
  @IsOptional()
  @IsArray({ message: 'Los productos deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'La orden debe contener al menos un producto' })
  @ValidateNested({ each: true })
  @IsString({ each: true, message: 'Cada producto debe ser una cadena de texto' })
  @Type(() => String)
  products?: string[];

  @ApiPropertyOptional({
    description: 'Monto total de la orden en centavos',
    example: 24999,
    type: Number,
    minimum: 0
  })
  @IsOptional()
  @IsNumber({}, { message: 'El monto total debe ser un número' })
  @Min(0, { message: 'El monto total no puede ser negativo' })
  totalAmount?: number;

  @ApiPropertyOptional({
    description: 'Estado actual de la orden',
    example: 'PROCESSING',
    enum: ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED']
  })
  @IsOptional()
  @IsString({ message: 'El estado debe ser una cadena de texto' })
  status?: string;

  @ApiPropertyOptional({
    description: 'Indica si la orden ha sido pagada',
    example: true,
    type: Boolean
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo isPaid debe ser un valor booleano' })
  isPaid?: boolean;
}