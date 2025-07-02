import { ApiProperty } from "@nestjs/swagger";

export class CreateBookCollectionDto {
  @ApiProperty({ example: "Colletion id", description: "Collection id " })
  collectionId: number;

  @ApiProperty({ example: "Book id", description: "Book id" })
  bookId: number;
}
