import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Book} from '../../book/schemas/book.schema'
import {BookSchema} from '../../book/schemas/book.schema'
import * as mongoose from 'mongoose';
import {User} from '../../user/schema/user.schema'
export type CartDocument = Cart & Document;

@Schema()
export class Cart {
   
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
    books: Book[];
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
    user: User;
}

export const CartSchema = SchemaFactory.createForClass(Cart);