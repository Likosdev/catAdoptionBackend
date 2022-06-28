import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  breed: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  shelter: string;
}
