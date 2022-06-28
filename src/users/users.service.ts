import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { addUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    return await this.userModel.find().select('name').exec();
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
    };
  }
}
