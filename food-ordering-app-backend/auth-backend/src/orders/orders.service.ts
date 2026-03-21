import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  create(orderData: Partial<Order>) {
    const order = this.ordersRepository.create(orderData);
    return this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find();
  }
}