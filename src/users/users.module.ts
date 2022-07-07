import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

  ],
  providers: [JwtService, UsersService, ConfigService, {provide: APP_GUARD, useClass: RolesGuard}],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
