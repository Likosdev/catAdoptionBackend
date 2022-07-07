import { BadRequestException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { User } from './schema/user.schema';
import { addUserDto } from './users.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private configSercive: ConfigService) { }
  
  async onModuleInit() {
    try {
      const createdUser = await this.createUser({ 
        name: "admin", 
        password: this.configSercive.get<string>('ADMIN_USER_PASSWORT'),
        roles: [Role.Admin, Role.User]  
      })
      console.log('admin user successfully created')
      console.log(createdUser);
        
    } catch (error) {
      console.log(`Could not create admin user because: ${error}`)
    }
    
  }

  async findUserById(user_id: string) {
    return await this.userModel.findById(user_id).exec()
  }

  async getUsers() {
    return await this.userModel.find().select(['name','roles']).exec();
  }

  async deleteUser(userId: string) {
    return await this.userModel.deleteOne({ _id: userId }).exec();
  }

  async findUserByName(userName: string): Promise<User> {
    return await this.userModel.findOne({ name: userName }).exec();
  }
  async createUser(usersDto: addUserDto) {
    if (!usersDto.name || !usersDto.password) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'Either missing Username or Password',
      );
    }

    const existingUser = await this.findUserByName(usersDto.name);
    console.log("found existing user: ", existingUser);
    if (existingUser) {
      throw new BadRequestException(
        HttpStatus.BAD_REQUEST,
        'User with username already exists',
      );
    }

    const salt = await bcrypt.genSalt();
    usersDto.password = await bcrypt.hash(usersDto.password, salt);
    const newUser = await this.userModel.create(usersDto);

    return {
      message: 'user created',
      username: newUser.name,
      id: newUser._id,
      roles: newUser.roles
    };
  }
}
