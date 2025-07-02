import { Injectable } from '@nestjs/common';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookCollection } from './models/book-collection.model';

@Injectable()
export class BookCollectionService {
  constructor(
    @InjectModel(BookCollection) private readonly bookControllerModel: typeof BookCollection
  ){}
  create(createBookCollectionDto: CreateBookCollectionDto) {
    return this.bookControllerModel.create(createBookCollectionDto);
  }

  findAll() {
    return this.bookControllerModel.findAll();
  }

  findOne(id: number) {
    return this.bookControllerModel.findByPk(id);
  }

  update(id: number, updateBookCollectionDto: UpdateBookCollectionDto) {
    return this.bookControllerModel.update(updateBookCollectionDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.bookControllerModel.destroy({where: {id}});
  }
}
