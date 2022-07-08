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
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/users/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { SheltersService } from './shelters.service';

@ApiTags('shelters')
@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @UseGuards(JwtAuthGuard)
  @Roles(Role.User)
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
  @Roles(Role.User)
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.sheltersService.update(id, updateShelterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @Roles(Role.User)
  remove(@Param('id') id: string) {
    return this.sheltersService.remove(id);
  }
}
