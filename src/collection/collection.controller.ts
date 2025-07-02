import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Collection } from "./models/collection.model";

@ApiTags("collection")
@Controller("collection")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: " collection yaratish" })
  @ApiResponse({
    status: 201,
    description: "collection yaratildi",
    type: Collection,
  })
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @ApiOperation({ summary: " collectionni olish" })
  @ApiResponse({
    status: 200,
    description: "collection olindi",
    type: Collection,
  })
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @ApiOperation({ summary: " collectionni olish" })
  @ApiResponse({
    status: 200,
    description: "collection olindi",
    type: Collection,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.collectionService.findOne(+id);
  }

  @ApiOperation({ summary: " collection yaratish" })
  @ApiResponse({
    status: 200,
    description: "collection yaratildi",
    type: Collection,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @ApiOperation({ summary: " collectionni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "collection o'chirildi",
    type: Collection,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.collectionService.remove(+id);
  }
}
