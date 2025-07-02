import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Subscription } from "../../subscription/models/subscription.model";

export interface IUserCreationAttr {
  full_name: string;
  password: string;
  phone: string;
  email: string;
  gender: string;
  birth_year: number;
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @Column({
    type: DataType.STRING(20),
  })
  declare phone: string;

  @Column({
    type: DataType.ENUM("Erkak", "Ayol"),
  })
  declare gender: string;

  @Column({
    type: DataType.SMALLINT,
  })
  declare birth_year: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_premium: boolean;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @Column({
    type: DataType.STRING(2000),
    allowNull: true,
  })
  declare refresh_token: string;

  @HasMany(() => Subscription)
  subscription: Subscription[]
}
