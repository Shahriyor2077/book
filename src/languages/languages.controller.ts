import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LanguagesService } from "./languages.service";
import { CreateLanguageDto } from "./dto/create-language.dto";
import { UpdateLanguageDto } from "./dto/update-language.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Language } from "./models/language.model";

@ApiTags("Tillar")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @ApiOperation({ summary: "Til yaratish" })
  @ApiResponse({ status: 201, description: "Til yangilandi", type: Language })
  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(createLanguageDto);
  }

  @ApiOperation({ summary: "Barcha tilni korish" })
  @ApiResponse({ status: 200, description: "Til olindi", type: Language })
  @Get()
  findAll() {
    return this.languagesService.findAll();
  }

  @ApiOperation({ summary: "Bitta tilni korish" })
  @ApiResponse({ status: 200, description: "Til olindi", type: Language })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.languagesService.findOne(+id);
  }

  @ApiOperation({ summary: "Tilni yangilash" })
  @ApiResponse({ status: 200, description: "Til yangilandi", type: Language })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLanguageDto: UpdateLanguageDto
  ) {
    return this.languagesService.update(+id, updateLanguageDto);
  }

  @ApiOperation({ summary: " Tilni o'chirish" })
  @ApiResponse({ status: 200, description: "Til o'chirildi", type: Language })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.languagesService.remove(+id);
  }
}
