import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAuthorDto {
  @ApiProperty({ example: "Shahriyor", description: "Author ismi" })
  @IsString()
  full_name: string;

  @ApiProperty({ example: "Kitoblar", description: "Bio" })
  @IsString()
  bio: string;

  @ApiProperty({ example: "shookh_uz", description: "url" })
  @IsString()
  photo_url: string;
}
