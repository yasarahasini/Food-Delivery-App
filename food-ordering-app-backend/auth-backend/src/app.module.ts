import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entity/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'foodapp',
      entities: [User, Order],
      synchronize: true,
    }),
    AuthModule,
    OrdersModule,
  ],
})
export class AppModule {}