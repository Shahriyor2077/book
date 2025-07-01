import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt } from "class-validator";

export class CreateBookDto {
  @ApiProperty({ example: "2020", description: "Chiqarilgan yili" })
  @IsString()
  publisher_year: string;

  @ApiProperty({ example: 1, description: "Author ID" })
  @IsInt()
  authorId: number;
}
