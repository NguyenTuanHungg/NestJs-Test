import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel:mongoose.Model<Book>
    ){}
    //pagination
    async findAll(page: number = 1,
        limit: number = 13): Promise<{books:Book[];total:number}>{
            const count = await this.bookModel.countDocuments().exec()
        const books = await this.bookModel.find().skip((page - 1) * limit)
        .limit(limit)
        .exec();
        return {books,total:count};
    }
   // Create
    async create(book:Book): Promise<Book>{
        const res=await this.bookModel.create(book)
        return res;
    }
    //
    async findById(id:string): Promise<Book>{
        const book=await this.bookModel.findById(id)
        if(!book){
            throw new NotFoundException('not found book')
        }
        return book;
    }
    // Update
    async UpdateById(id:string,book:Book): Promise<Book>{
        return await this.bookModel.findByIdAndUpdate(id,book,{
            new: true,
            runValidators:true
        })
    }
    // Delete
    async deleteById(id:string): Promise<Book>{
        return this.bookModel.findByIdAndDelete(id);
    }
}
