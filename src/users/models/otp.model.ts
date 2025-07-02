
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IOtpCreationAttr{
    // id: string;
    otp: string;
    expiration_time: Date;
    // virified: boolean;
    phone_number: string;
}

@Table({ tableName: "otp" })
export class Otp extends Model<Otp, IOtpCreationAttr> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(4),
  })
  declare otp: string;

  @Column({
    type: DataType.DATE,
  })
  declare expiration_time: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare virified: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare phone_number: string;
}