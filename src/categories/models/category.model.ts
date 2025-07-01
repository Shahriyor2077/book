import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface ICategoriesCreationAttr {
  name: string;
}

@Table({ tableName: "categories" })
export class Categories extends Model<Categories, ICategoriesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(30),
  })
  name: string;
}
