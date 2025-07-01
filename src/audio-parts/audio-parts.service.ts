import { Injectable } from "@nestjs/common";
import { CreateAudioPartDto } from "./dto/create-audio-part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio-part.dto";
import { InjectModel } from "@nestjs/sequelize";
import { AudioPart } from "./models/audio-part.model";

@Injectable()
export class AudioPartsService {
  constructor(
    @InjectModel(AudioPart) private readonly audioPartModel: typeof AudioPart
  ) {}
  create(createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartModel.create(createAudioPartDto);
  }

  findAll() {
    return this.audioPartModel.findAll();
  }

  findOne(id: number) {
    return this.audioPartModel.findByPk(id);
  }

  update(id: number, updateAudioPartDto: UpdateAudioPartDto) {
    return this.audioPartModel.update(updateAudioPartDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.audioPartModel.destroy({ where: { id } });
  }
}
