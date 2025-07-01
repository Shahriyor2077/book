import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class CreateBookVersionDto {
  @ApiProperty({ example: 1, description: "Book ID" })
  @IsInt()
  book_id: number;

  @ApiProperty({ example: 1, description: "Language ID" })
  @IsInt()
  language_id: number;

  @ApiProperty({ example: "Kitob nomi", description: "Title" })
  @IsString()
  title: string;

  @ApiProperty({ example: "Kitob tavsifi", description: "Description" })
  @IsString()
  description: string;

  @ApiProperty({
    example: "https://example.com/text.pdf",
    description: "Text URL",
  })
  @IsString()
  text_url: string;

  @ApiProperty({
    example: "https://example.com/cover.jpg",
    description: "Cover URL",
  })
  @IsString()
  cover_url: string;
}
