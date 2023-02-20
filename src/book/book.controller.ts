import {Param, Body, Controller, Get, Post, Put, Delete,Query} from '@nestjs/common';
import { Book } from './schemas/book.schema';
import { BookService } from './book.service';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}
        @Get()
        async getAllBooks(  @Query('page') page: number = 1,
        @Query('limit') limit: number = 3,): Promise<{books:Book[];total:number}> {
            return this.bookService.findAll(page,limit)
        }
        @Post()
        async createBook(
            @Body() 
            book,
        ): Promise<Book>{
            return this.bookService.create(book)
        }
        @Get(':id')
        async getBook(@Param('id') id:string): Promise<Book>{
            return this.bookService.findById(id)
        }
        @Put(':id')
        async updateBook(@Param('id') id:string,@Body() book:updateBookDto):   Promise<Book>{
            return this.bookService.UpdateById(id,book);

        }
        @Delete(':id')
        async deleteBook(@Param('id') id:string): Promise<Book>{
            return this.bookService.deleteById(id);
        }

}
