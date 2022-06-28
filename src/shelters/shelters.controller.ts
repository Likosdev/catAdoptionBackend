import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { SheltersService } from './shelters.service';

@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createShelterDto: CreateShelterDto) {
    return this.sheltersService.create(createShelterDto);
  }

  @Get()
  findAll() {
    return this.sheltersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheltersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.sheltersService.update(id, updateShelterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheltersService.remove(id);
  }
}
