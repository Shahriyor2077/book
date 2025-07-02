import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { BookVersionService } from "./book-version.service";
import { CreateBookVersionDto } from "./dto/create-book-version.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookVersion } from "./models/book-version.model";

@ApiTags("Book version")
@Controller("book-version")
export class BookVersionController {
  constructor(private readonly bookVersionService: BookVersionService) {}

  @ApiOperation({ summary: " Book version yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kitob versiyasi yaratildi",
    type: BookVersion,
  })
  @Post()
  create(@Body() createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionService.create(createBookVersionDto);
  }

  @ApiOperation({ summary: " Book version olish" })
  @ApiResponse({
    status: 200,
    description: "Kitob versiyasi olindi",
    type: BookVersion,
  })
  @Get()
  findAll() {
    return this.bookVersionService.findAll();
  }

  @ApiOperation({ summary: " Book version olish" })
  @ApiResponse({
    status: 200,
    description: "Kitob versiyasi olindi",
    type: BookVersion,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookVersionService.findOne(+id);
  }

  @ApiOperation({ summary: " Book version yaratildi" })
  @ApiResponse({
    status: 200,
    description: "Kitob versiyasi yangilandi",
    type: BookVersion,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookVersionDto: any) {
    return this.bookVersionService.update(+id, updateBookVersionDto);
  }

  @ApiOperation({ summary: " Book version o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kitob versiyasi o'chirildi",
    type: BookVersion,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookVersionService.remove(+id);
  }
}
