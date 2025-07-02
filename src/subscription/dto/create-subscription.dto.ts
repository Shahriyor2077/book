import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
  @ApiProperty({ example: "User id", description: "user id" })
  userId: number;
  @ApiProperty({ example: "Sana kiriting", description: "Boshlanish sanasi" })
  startDate: Date;
  @ApiProperty({ example: "Tugash sana", description: "Tugash sana" })
  endDate: Date;
}
