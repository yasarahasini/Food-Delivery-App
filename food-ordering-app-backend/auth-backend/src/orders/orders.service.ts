import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private repo: Repository<Order>,
  ) {}

  create(dto: CreateOrderDto) {
    const order = this.repo.create(dto);
    return this.repo.save(order);
  }

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }
}
