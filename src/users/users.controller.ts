import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './role.enum';
import { Roles } from './roles.decorator';
import { addUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  
  @Post()
  @UseGuards(JwtAuthGuard)
  async addUser(@Body() body: addUserDto) {
    return this.userService.createUser(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
