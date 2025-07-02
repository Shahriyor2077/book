import { Injectable } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from './models/collection.model';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection)private readonly collectionModel: typeof Collection
  ){}
  create(createCollectionDto: CreateCollectionDto) {
    return this.collectionModel.create(createCollectionDto);
  }

  findAll() {
    return this.collectionModel.findAll();
  }

  findOne(id: number) {
    return this.collectionModel.findByPk(id);
  }

  update(id: number, updateCollectionDto: UpdateCollectionDto) {
    return this.collectionModel.update(updateCollectionDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.collectionModel.destroy({where: {id}});
  }
}
