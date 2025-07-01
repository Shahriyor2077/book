import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, IsString } from "class-validator";

export class CreateAudioBookDto {
  @ApiProperty({ example: "1", description: "Kitob id si" })
  @IsNumber()
  book_version_id: number;

  @ApiProperty({ example: "Shahriyor", description: "Audio ijrochisi" })
  @IsString()
  narrator_name: string;

  @ApiProperty({ example: "1", description: "Kitob audio soni" })
  @IsNumber()
  total_duration: number;

  @ApiProperty({ example: "5.5", description: "Kitob id si" })
  @IsDecimal()
  total_size_mg: number;
}
