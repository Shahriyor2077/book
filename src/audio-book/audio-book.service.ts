import { Injectable } from "@nestjs/common";
import { CreateAudioBookDto } from "./dto/create-audio-book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio-book.dto";
import { InjectModel } from "@nestjs/sequelize";
import { AudioBook } from "./models/audio-book.model";

@Injectable()
export class AudioBookService {
  constructor(
    @InjectModel(AudioBook) private readonly audioBookmodel: typeof AudioBook
  ) {}
  create(createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookmodel.create(createAudioBookDto);
  }

  findAll() {
    return this.audioBookmodel.findAll();
  }

  findOne(id: number) {
    return this.audioBookmodel.findByPk(id);
  }

  update(id: number, updateAudioBookDto: UpdateAudioBookDto) {
    return this.audioBookmodel.update(updateAudioBookDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.audioBookmodel.destroy({ where: { id } });
  }
}
