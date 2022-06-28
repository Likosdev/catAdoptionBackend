import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  address: {
    street: string;
    zip: number;
  };

  @IsObject()
  @ApiProperty()
  contact: {
    phone: string;
    mobile: string;
    email: string;
  };
}
