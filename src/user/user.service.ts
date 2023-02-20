import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import {LoginDto} from './dto/login.dto';
import * as bcrypt from 'bcrypt';

import {JwtService} from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(
        @InjectModel('user')
        private usersModel: mongoose.Model<UserDocument>,
        private readonly jwtService: JwtService
    ){}
    //sign up
    async signUp(createUserDto:CreateUserDto): Promise< UserDocument > {
        
      if (await this.usersModel.findOne({ email: createUserDto.email })) {
        throw new UnauthorizedException('email already in use');
      }
        const hashedPassword = await bcrypt.hash(createUserDto.password,10);
        const newUser = new this.usersModel({
          ...createUserDto,
          password: hashedPassword
        });
    
        const result = await newUser.save();
        
      
        return result
      }
      //sign in
      async signIn(loginDto:LoginDto): Promise< {accessToken:string} >{
        const email=loginDto.email
        const user = await this.usersModel.findOne({email})
        const password=loginDto.password
        if (!user) {
          return null;
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
          return null;
        }
        const payload = { email: user.email};
        const accessToken=this.jwtService.sign(payload)
        return {
          accessToken
        };
      }
      async updatePassword( id: string,password:string): Promise<UserDocument> {
        return  await this.usersModel.findByIdAndUpdate(
          id,
          { password},
          { new: true },
        );
      }
  
}
