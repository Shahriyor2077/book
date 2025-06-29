import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IAdminCreationAttr {
  full_name: string;
  password: string;
  phone: string;
  email: string;
  role: string;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
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
    type: DataType.ENUM("super_admin", "admin", "moderator"),
    defaultValue: "admin",
  })
  declare role: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING(2000),
    allowNull: true,
  })
  declare refresh_token: string;
}
