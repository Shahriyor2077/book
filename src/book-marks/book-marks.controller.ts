import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookMarksService } from "./book-marks.service";
import { CreateBookMarkDto } from "./dto/create-book-mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book-mark.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BookMark } from "./models/book-mark.model";

@ApiTags("Kitob belgilari")
@Controller("book-marks")
export class BookMarksController {
  constructor(private readonly bookMarksService: BookMarksService) {}

  @ApiOperation({ summary: "Kitob belgilarini yaratish" })
  @ApiResponse({ status: 201, description: "Belgi yaratildi", type: BookMark })
  @Post()
  create(@Body() createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarksService.create(createBookMarkDto);
  }

  @ApiOperation({ summary: "Kitob belgilarini olish" })
  @ApiResponse({ status: 200, description: "Belgi olindi", type: BookMark })
  @Get()
  findAll() {
    return this.bookMarksService.findAll();
  }

  @ApiOperation({ summary: "Kitob belgilarini olish" })
  @ApiResponse({ status: 200, description: "Belgi olindi", type: BookMark })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookMarksService.findOne(+id);
  }

  @ApiOperation({ summary: "Kitob belgilarini yangilash" })
  @ApiResponse({ status: 200, description: "Belgi yangilandi", type: BookMark })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBookMarkDto: UpdateBookMarkDto
  ) {
    return this.bookMarksService.update(+id, updateBookMarkDto);
  }

  @ApiOperation({ summary: "Kitob belgilarini o'chirish" })
  @ApiResponse({ status: 200, description: "Belgi o'chirildi", type: BookMark })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookMarksService.remove(+id);
  }
}
