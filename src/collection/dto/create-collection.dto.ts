import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateCollectionDto {
  @ApiProperty({ example: "Kitob", description: "Kitob" })
  @IsString()
  title: string;
  @ApiProperty({ example: "Kitob juda zo'r", description: "Kitob haqida" })
  @IsString()
  description: string;
  @ApiProperty({ example: "url", description: "Kitob url" })
  @IsString()
  coverImageUrl: string;
  @ApiProperty({
    example: "Yaratgan shaxs",
    description: "Kitob kim tomonidan yaratilgani",
  })
  @IsBoolean()
  createdBy: number;
  @ApiProperty({ example: "Ommaviyligi", description: "Kitob ommaviyligi" })
  @IsBoolean()
  isPublic: boolean;
  @ApiProperty({
    example: "Premium borligi",
    description: "Premium obunaga ega yoki yo'q",
  })
  @IsBoolean()
  isPremiumOnyl: boolean;
  @ApiProperty({ example: "Premium", description: "Premium" })
  @IsBoolean()
  isPremium: boolean;
}
