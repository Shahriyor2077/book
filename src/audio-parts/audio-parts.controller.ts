import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AudioPartsService } from "./audio-parts.service";
import { CreateAudioPartDto } from "./dto/create-audio-part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio-part.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AudioPart } from "./models/audio-part.model";

@Controller("audio-parts")
export class AudioPartsController {
  constructor(private readonly audioPartsService: AudioPartsService) {}

  @ApiOperation({ summary: " Audio partni yaratish" })
  @ApiResponse({
    status: 201,
    description: "Audio part yaratildi",
    type: AudioPart,
  })
  @Post()
  create(@Body() createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartsService.create(createAudioPartDto);
  }

  @ApiOperation({ summary: "Barcha Audio partni olish" })
  @ApiResponse({
    status: 200,
    description: "Audio part olindi",
    type: AudioPart,
  })
  @Get()
  findAll() {
    return this.audioPartsService.findAll();
  }

  @ApiOperation({ summary: " Audio partni olish" })
  @ApiResponse({
    status: 200,
    description: "Audio part olindi",
    type: AudioPart,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.audioPartsService.findOne(+id);
  }

  @ApiOperation({ summary: " Audio partni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Audio part yangilandi",
    type: AudioPart,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAudioPartDto: UpdateAudioPartDto
  ) {
    return this.audioPartsService.update(+id, updateAudioPartDto);
  }

  @ApiOperation({ summary: " Audio partni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Audio part o'chirildi",
    type: AudioPart,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.audioPartsService.remove(+id);
  }
}
