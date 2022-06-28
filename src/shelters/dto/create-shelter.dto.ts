import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';


export class ShelterAdressDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  street: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  zip: number;
}

export class ShelterContactDto
{
  @ApiProperty()
  @IsString()
  phone: string;
  
  @ApiProperty()
  @IsString()
  mobile: string;
  
  @ApiProperty()
  @IsString()
  email: string;
}


export class CreateShelterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty()
  address: ShelterAdressDto

  @IsObject()
  @ApiProperty()
  contact: ShelterContactDto

}

