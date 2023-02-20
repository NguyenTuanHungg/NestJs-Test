import { Controller, Post,Body,Param,Put, Request,Session } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginDto} from './dto/login.dto';
import {UserService} from './user.service'
import {UserDocument} from './schema/user.schema'
import  cookieParser from 'cookie-parser';
@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService 
    ){}
    @Post('register')
     async signUp(@Body() createUserDto:CreateUserDto):Promise< UserDocument>
     {
        return this.userService.signUp(createUserDto)
     }
     @Post('signin')
     async signIn(@Body() loginDto:LoginDto, @Request() req):Promise<{accessToken:string}>{
        
        return this.userService.signIn(loginDto)
     }
    
     @Put(':id')
     async updatePassword(@Param('id') id:string,password:string):Promise<UserDocument>{
      return this.userService.updatePassword(id,password)
     }
}
