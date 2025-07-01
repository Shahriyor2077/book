import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AudioBookService } from "./audio-book.service";
import { CreateAudioBookDto } from "./dto/create-audio-book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio-book.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AudioBook } from "./models/audio-book.model";

@ApiTags("Audio kitoblar")
@Controller("audio-book")
export class AudioBookController {
  constructor(private readonly audioBookService: AudioBookService) {}

  @ApiOperation({ summary: "Audio book qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Audio book qo'shildi",
    type: AudioBook,
  })
  @Post()
  create(@Body() createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookService.create(createAudioBookDto);
  }

  @ApiOperation({ summary: "Barcha Audio bookni olish" })
  @ApiResponse({
    status: 200,
    description: "Audio book olindi",
    type: AudioBook,
  })
  @Get()
  findAll() {
    return this.audioBookService.findAll();
  }

  @ApiOperation({ summary: "Bitta Audio bookni olish" })
  @ApiResponse({
    status: 200,
    description: "Bitta Audio book olindi",
    type: AudioBook,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.audioBookService.findOne(+id);
  }

  @ApiOperation({ summary: " Audio bookni yangilash" })
  @ApiResponse({
    status: 200,
    description: "Audio book yangilandi",
    type: AudioBook,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAudioBookDto: UpdateAudioBookDto
  ) {
    return this.audioBookService.update(+id, updateAudioBookDto);
  }

  @ApiOperation({ summary: " Audio bookni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Audio book o'chirildi",
    type: AudioBook,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.audioBookService.remove(+id);
  }
}
