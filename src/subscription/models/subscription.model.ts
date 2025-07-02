import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface ISubscriptionCreationAttr {
  userId: number;
  startDate: Date;
  endDate: Date;
}

@Table({tableName: "subscription"})

export class Subscription extends Model<
  Subscription,
  ISubscriptionCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(()=>User)
  @Column({
    type: DataType.INTEGER,
  })
  declare userId: number;
  @BelongsTo(()=>User)
  user: User

  @Column({
    type: DataType.DATE,
  })
  declare startDate: Date;

  @Column({
    type: DataType.DATE,
  })
  declare endDate: Date;
}
