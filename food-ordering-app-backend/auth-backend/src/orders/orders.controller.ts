import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entity/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() orderData: Partial<Order>) {
    return this.ordersService.create(orderData);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}