import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Book } from "./models/book.model";

@ApiTags("Kitoblar")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: " Book yaratish" })
  @ApiResponse({
    status: 201,
    description: "Kitob yaratildi",
    type: Book,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @ApiOperation({ summary: " Book ni olish" })
  @ApiResponse({
    status: 200,
    description: "Kitob olindi",
    type: Book,
  })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: " Book yaratish" })
  @ApiResponse({
    status: 200,
    description: "Kitob yaratildi",
    type: Book,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.booksService.findOne(+id);
  }

  @ApiOperation({ summary: " Book yangilandi" })
  @ApiResponse({
    status: 200,
    description: "Kitob yangilandi",
    type: Book,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookDto: any) {
    return this.booksService.update(+id, updateBookDto);
  }

  @ApiOperation({ summary: " Book o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Kitob o'chirildi",
    type: Book,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.booksService.remove(+id);
  }
}
