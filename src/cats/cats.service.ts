import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  async create(createCatDto: CreateCatDto) {
    return await this.catModel.create(createCatDto);
  }

  async findAll() {
    return await this.catModel.find().exec();
  }

  async findOne(id: string) {
    return await this.catModel.findById(id).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    return await this.catModel.findByIdAndUpdate(id, updateCatDto).exec();
  }

  async remove(id: string) {
    return await this.catModel.remove({ _id: id });
  }
}
