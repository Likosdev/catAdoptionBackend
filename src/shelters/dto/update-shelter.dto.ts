import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateShelterDto } from './create-shelter.dto';

export class UpdateShelterDto extends PartialType(CreateShelterDto) {
  @IsArray()
  @ApiProperty()
  cats: string[];
}
