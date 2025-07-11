import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenreDto {
  @ApiProperty({ example: "Roman", description: "Roman" })
  @IsString()
  name: string;
}
