import { Controller, Get,Post,Put, Session,Body} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDocument } from './schema/cart.schema';
import {User} from '../user/schema/user.schema'
import {Book} from '..//book/schemas/book.schema'
@Controller('cart')
export class CartController {
    constructor(
        private cartService: CartService
    ){}
     @Get()
      async getCart( userId: string) {
        return this.cartService.getCart(userId);
      }
     @Post()
      async addToCart( userId:string, @Body() book:Book,quantity:number) {
        return this.cartService.addItemToCart(userId, book,quantity);
      }
     
}
