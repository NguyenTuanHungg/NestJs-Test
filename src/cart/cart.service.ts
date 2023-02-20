import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schema/cart.schema';
import {User} from '../user/schema/user.schema'
import {Book} from '../book/schemas/book.schema'

@Injectable()
export class CartService {
    constructor(
        @InjectModel('Cart') private readonly cartModel: Model<CartDocument>
    ){}
    
    
      async getCart(userId: string): Promise<CartDocument> {
        return await this.cartModel.findOne({ user:userId }).populate('books');
      }
    
      async addItemToCart(userId:string, book:Book, quantity: number):Promise<CartDocument> {
        const cart = await this.getCart(userId);
        if (cart) {
          cart.books.push(book);
          return cart.save();
        } 
        else {
          const newCart = await this.cartModel.create({ userId, books: [book] });
          return newCart.populate('books');
        }
       
      }
    
      
}
