import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { Shelter } from './schemas/shelter.schema';

@Injectable()
export class SheltersService {
  constructor(
    @InjectModel(Shelter.name) private shelterModel: Model<Shelter>,
  ) {}

  async create(createShelterDto: CreateShelterDto) {
    return await this.shelterModel.create(createShelterDto);
  }

  async findAll() {
    return await this.shelterModel.find().exec();
  }

  async findOne(id: string) {
    return await this.shelterModel.findById(id).exec();
  }

  async update(id: string, updateShelterDto: UpdateShelterDto) {
    return await this.shelterModel.findByIdAndUpdate(id, updateShelterDto);
  }

  async remove(id: string) {
    return this.shelterModel.remove({ _id: id }).exec();
  }
}
