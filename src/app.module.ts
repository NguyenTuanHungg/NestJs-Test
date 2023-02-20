import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { SessionModule } from 'nestjs-session';
import  connectMongo from 'connect-mongo';

@Module({
  imports: [
    BookModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/HoaBinh'),
    UserModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
