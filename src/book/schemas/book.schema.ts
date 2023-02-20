import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps: true
})

export class Book{
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    price:number ;
    @Prop()
    author:string;
    
}
 export const BookSchema=  SchemaFactory.createForClass(Book)

