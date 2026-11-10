import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus, 
  ParseUUIDPipe,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Order } from '@domain/entities/order.entity';
import { CreateOrderDto } from '@infrastructure/dto/create-order.dto';
import { UpdateOrderDto } from '@infrastructure/dto/update-order.dto';
import { CreateOrderUseCase } from '@application/use-cases/create-order.usecase';
import { GetOrderUseCase } from '@application/use-cases/get-order.usecase';
import { UpdateOrderUseCase } from '@application/use-cases/update-order.usecase';
import { DeleteOrderUseCase } from '@application/use-cases/delete-order.usecase';

@ApiTags('orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderUseCase: CreateOrderUseCase,
    private readonly getOrderUseCase: GetOrderUseCase,
    private readonly updateOrderUseCase: UpdateOrderUseCase,
    private readonly deleteOrderUseCase: DeleteOrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Crear una nueva orden', 
    description: 'Crea una nueva orden en el sistema con los datos proporcionados. La orden se persiste en DynamoDB.' 
  })
  @ApiBody({ type: CreateOrderDto, description: 'Datos de la orden a crear' })
  @ApiResponse({ 
    status: 201, 
    description: 'Orden creada exitosamente',
    type: Order
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.createOrderUseCase.execute({
      customerId: createOrderDto.customerId,
      products: createOrderDto.products,
      totalAmount: createOrderDto.totalAmount,
    });
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener una orden por ID', 
    description: 'Recupera los detalles de una orden específica utilizando su identificador único' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identificador único de la orden (UUID)',
    type: String,
    format: 'uuid'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden encontrada exitosamente',
    type: Order
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden no encontrada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order | null> {
    return this.getOrderUseCase.execute(id);
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Actualizar una orden existente', 
    description: 'Actualiza los datos de una orden existente. Solo se actualizan los campos proporcionados.' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identificador único de la orden a actualizar (UUID)',
    type: String,
    format: 'uuid'
  })
  @ApiBody({ type: UpdateOrderDto, description: 'Datos a actualizar en la orden' })
  @ApiResponse({ 
    status: 200, 
    description: 'Orden actualizada exitosamente',
    type: Order
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos de entrada inválidos' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden no encontrada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<Order> {
    return this.updateOrderUseCase.execute(id, {
      customerId: updateOrderDto.customerId,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ 
    summary: 'Eliminar una orden', 
    description: 'Elimina una orden del sistema permanentemente' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Identificador único de la orden a eliminar (UUID)',
    type: String,
    format: 'uuid'
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Orden eliminada exitosamente' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Orden no encontrada' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.deleteOrderUseCase.execute(id);
  }
}