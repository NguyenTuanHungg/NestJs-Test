import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import {BookSchema} from '../book/schemas/book.schema'
import { MongooseModule } from '@nestjs/mongoose';
import {CartSchema} from './schema/cart.schema'
import  connectMongo from 'connect-mongo';
import { SessionModule } from 'nestjs-session';

@Module({
  imports:[MongooseModule.forFeature([{name:'Book',schema:BookSchema}]),
  MongooseModule.forFeature([{name:'Cart',schema:CartSchema}]),
  
],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
