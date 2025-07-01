import { Module } from '@nestjs/common';
import { AudioBookService } from './audio-book.service';
import { AudioBookController } from './audio-book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioBook } from './models/audio-book.model';

@Module({
  imports: [SequelizeModule.forFeature([AudioBook])],
  controllers: [AudioBookController],
  providers: [AudioBookService],
  exports: [AudioBookService]
})
export class AudioBookModule {}
