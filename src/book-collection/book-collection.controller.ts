import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookCollectionService } from './book-collection.service';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';
import { UpdateBookCollectionDto } from './dto/update-book-collection.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookCollection } from './models/book-collection.model';

@ApiTags("Book controller")
@Controller("book-collection")
export class BookCollectionController {
  constructor(private readonly bookCollectionService: BookCollectionService) {}

  @ApiOperation({ summary: "Book collection yaratish" })
  @ApiResponse({
    status: 201,
    description: "Book collection yaratildi",
    type: BookCollection,
  })
  @Post()
  create(@Body() createBookCollectionDto: CreateBookCollectionDto) {
    return this.bookCollectionService.create(createBookCollectionDto);
  }

  @ApiOperation({ summary: "Book collection olish" })
  @ApiResponse({
    status: 200,
    description: "Book collection olindi",
    type: BookCollection,
  })
  @Get()
  findAll() {
    return this.bookCollectionService.findAll();
  }

  @ApiOperation({ summary: "Book collection olish" })
  @ApiResponse({
    status: 200,
    description: "Book collection olindi",
    type: BookCollection,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookCollectionService.findOne(+id);
  }

  @ApiOperation({ summary: "Book collection yangilash" })
  @ApiResponse({
    status: 200,
    description: "Book collection yangilash",
    type: BookCollection,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateBookCollectionDto: UpdateBookCollectionDto
  ) {
    return this.bookCollectionService.update(+id, updateBookCollectionDto);
  }

  @ApiOperation({ summary: "Book collection o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Book collection o'chirildi",
    type: BookCollection,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookCollectionService.remove(+id);
  }
}
