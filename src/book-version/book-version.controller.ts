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

@Controller("book-version")
export class BookVersionController {
  constructor(private readonly bookVersionService: BookVersionService) {}

  @Post()
  create(@Body() createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionService.create(createBookVersionDto);
  }

  @Get()
  findAll() {
    return this.bookVersionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookVersionService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookVersionDto: any) {
    return this.bookVersionService.update(+id, updateBookVersionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookVersionService.remove(+id);
  }
}
