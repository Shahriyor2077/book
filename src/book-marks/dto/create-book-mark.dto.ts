import { ApiProperty } from "@nestjs/swagger";

export class CreateBookMarkDto {
  @ApiProperty({ example: "User Id", description: "User id" })
  userId: number;
  @ApiProperty({ example: "Book Id", description: "Book id" })
  bookId: number;
  @ApiProperty({ example: "Note", description: "Eslatma" })
  note: string;
  @ApiProperty({ example: "Position", description: "Position" })
  position: string;
}
