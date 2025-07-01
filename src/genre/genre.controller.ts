import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from './models/genre.model';

@ApiTags("Genre")
@Controller("genre")
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: "Yangi ganre yaratish" })
  @ApiResponse({ status: 201, description: "genre yaratildi", type: Genre })
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiOperation({ summary: "Barcha genrelarni olish" })
  @ApiResponse({ status: 200, description: "barcha ganre olindi", type: Genre })
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @ApiOperation({ summary: "Bitta genreni olish" })
  @ApiResponse({ status: 200, description: "genre olindi", type: Genre })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.genreService.findOne(+id);
  }

  @ApiOperation({ summary: "Genre ni yangilash" })
  @ApiResponse({ status: 200, description: "genre ni yangilash", type: Genre })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @ApiOperation({ summary: "Genre o'chirish" })
  @ApiResponse({ status: 200, description: "genre ni o'chirish", type: Genre })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.genreService.remove(+id);
  }
}
