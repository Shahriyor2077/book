import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateLanguageDto {
  @ApiProperty({ example: "uz", description: "uz, ru, eng" })
  @IsString()
  code: string;

  @ApiProperty({ example: "O'zbek", description: "Tilni tanlang" })
  @IsString()
  name: string;

  @ApiProperty({ example: "Uzb", description: "Bayroq" })
  @IsString()
  flag: string;
}
