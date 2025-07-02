import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Categories } from "./models/category.model";

@ApiTags("Categoriyalar")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: " Categoriyni yaratish" })
  @ApiResponse({
    status: 201,
    description: " categoriy yaratildi",
    type: Categories,
  })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiOperation({ summary: "Barcha Categoriyni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha categoriy olindi",
    type: Categories,
  })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({ summary: "Bitta Categoriyni olish" })
  @ApiResponse({
    status: 200,
    description: "Bitta categoriy olindi",
    type: Categories,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoriesService.findOne(+id);
  }

  @ApiOperation({ summary: " Categoriyni yangilash" })
  @ApiResponse({
    status: 200,
    description: " categoriy yangilandi",
    type: Categories,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: " Categoriyni o'chirish" })
  @ApiResponse({
    status: 200,
    description: " categoriy o'chirildi",
    type: Categories,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.remove(+id);
  }
}
