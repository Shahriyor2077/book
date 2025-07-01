import { Module } from '@nestjs/common';
import { AudioPartsService } from './audio-parts.service';
import { AudioPartsController } from './audio-parts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AudioPart } from './models/audio-part.model';

@Module({
  imports: [SequelizeModule.forFeature([AudioPart])],
  controllers: [AudioPartsController],
  providers: [AudioPartsService],
  exports: [AudioPartsService],
})
export class AudioPartsModule {}
