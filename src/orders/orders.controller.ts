import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity } from './entities/order.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Order')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBearerAuth()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return new OrderEntity(await this.ordersService.create(createOrderDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [OrderEntity] })
  async findAll() {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => new OrderEntity(order));
  }

  @Get('drafts')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [OrderEntity] })
  @ApiBearerAuth()
  async findDrafts() {
    const drafts = await this.ordersService.findDrafts();
    return drafts.map((order) => new OrderEntity(order));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  async findOne(@Param('id') id: string) {
    return new OrderEntity(await this.ordersService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: OrderEntity })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return new OrderEntity(await this.ordersService.update(id, updateOrderDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: OrderEntity })
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return new OrderEntity(await this.ordersService.remove(id));
  }
}
