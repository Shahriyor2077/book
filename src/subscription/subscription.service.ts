import { Injectable } from "@nestjs/common";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Subscription } from "./models/subscription.model";
@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription)
    private readonly subscriptionModel: typeof Subscription
  ) {}
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionModel.create(createSubscriptionDto);
  }

  findAll() {
    return this.subscriptionModel.findAll();
  }

  findOne(id: number) {
    return this.subscriptionModel.findByPk(id);
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionModel.update(updateSubscriptionDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.subscriptionModel.destroy({ where: { id } });
  }
}
