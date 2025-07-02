import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubscriptionService } from "./subscription.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Subscription } from "./models/subscription.model";

@ApiTags("Obunalar")
@Controller("subscription")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: "Obuna yaratish" })
  @ApiResponse({
    status: 201,
    description: "Obuna yaratildi",
    type: Subscription,
  })
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @ApiOperation({ summary: "Obuna olindi" })
  @ApiResponse({
    status: 200,
    description: "Obuna olindi",
    type: Subscription,
  })
  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @ApiOperation({ summary: "Obuna olindi" })
  @ApiResponse({
    status: 200,
    description: "Obuna olindi",
    type: Subscription,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.subscriptionService.findOne(+id);
  }

  @ApiOperation({ summary: "Obunani yangilash" })
  @ApiResponse({
    status: 200,
    description: "Obuna yangilandi",
    type: Subscription,
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto
  ) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @ApiOperation({ summary: "Obunani o'chirish" })
  @ApiResponse({
    status: 200,
    description: "Obuna o'chirildi",
    type: Subscription,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.subscriptionService.remove(+id);
  }
}
