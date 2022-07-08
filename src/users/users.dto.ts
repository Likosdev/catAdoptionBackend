import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from './role.enum';

export class addUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @ApiProperty()
  roles: string[];

  @IsEmail()
  @ApiProperty()
  email: string
}

export class userCreatedDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsEnum(Role)
  @ApiProperty()
  roles: string[];
}
