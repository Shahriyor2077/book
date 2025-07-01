import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, IsString } from "class-validator";


export class CreateAudioPartDto {
  @ApiProperty({ example: "1", description: "Audio bookni id si" })
  @IsNumber()
  audio_book_id: number;

  @ApiProperty({ example: "Qiziqatli kitob", description: "Kitob haqida" })
  @IsString()
  title: string;

  @ApiProperty({ example: "url", description: "url" })
  @IsString()
  file_url: string;

  @ApiProperty({ example: "1 soat", description: "daqida yoki soatda" })
  @IsNumber()
  duration: number;

  @ApiProperty({ example: "55.5", description: "mb yoki gb" })
  @IsDecimal()
  size_mb: number;

  order_index: number;
}
