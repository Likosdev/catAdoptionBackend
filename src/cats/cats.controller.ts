import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { identity, Observable, of } from 'rxjs';
import { Role } from 'src/users/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}


  @Roles(Role.User)
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  @Roles(Role.User)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  
  @Roles(Role.User)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: './public/images',
      filename: editFileName,
    }),
    fileFilter: imageFileFilter,
  }),)
  async uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File){
    const response = {
      originalName: file.originalname,
      filename: file.filename,
      cat: {}
    };

    const cat = await this.catsService.update(
      id,
      {image:file.filename}
    ).then(cat => {
      return cat
    })
    
    response.cat = cat;
    return response;
  }
  
  @Get(':id/image')
  async findCatImage(@Param('id') id, @Res() res) {
    const filename = await this.catsService.findOne(id).then(cat => {
      console.log('cat:', cat);
      return cat.image
      
      
      
    })
    console.log(filename);
    return res.sendFile(join(process.cwd(), 'public/images/' + filename))
  }

}
