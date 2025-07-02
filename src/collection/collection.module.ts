import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collection } from './models/collection.model';
import { BookCollection } from '../book-collection/models/book-collection.model';

@Module({
  imports: [SequelizeModule.forFeature([Collection, BookCollection])],
  controllers: [CollectionController],
  providers: [CollectionService],
  exports: [CollectionService]
})
export class CollectionModule {}
