import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserSchema} from './schema/user.schema';
import {MongooseModule} from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import {jwtConstants} from './auth/constant'
@Module({
  imports :[MongooseModule.forFeature([{name:'user',schema:UserSchema}]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
