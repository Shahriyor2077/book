import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AuthorsService } from "./authors.service";
import { CreateAuthorDto } from "./dto/create-author.dto";
import { UpdateAuthorDto } from "./dto/update-author.dto";
import { Author } from "./models/author.model";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: " Authorni yaratish" })
  @ApiResponse({ status: 201, description: "Author yaratildi", type: Author })
  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({ summary: "Barcha Authorni ko'rish" })
  @ApiResponse({ status: 200, description: "Author olindi", type: Author })
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({ summary: " Authorni ko'rish" })
  @ApiResponse({ status: 200, description: "Author olindi", type: Author })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorsService.findOne(+id);
  }

  @ApiOperation({ summary: " Authorni yangilash" })
  @ApiResponse({ status: 200, description: "Author yangilandi", type: Author })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @ApiOperation({ summary: " Authorni o'chirish" })
  @ApiResponse({ status: 200, description: "Author o'chirildi", type: Author })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.authorsService.remove(+id);
  }
}
