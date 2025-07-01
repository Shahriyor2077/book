import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IAuthorCreaionAttr {
  full_name: string;
  bio: string;
  photo_url: string;
}

@Table({ tableName: "authors" })
export class Author extends Model<Author, IAuthorCreaionAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  full_name: string;

  @Column({
    type: DataType.STRING,
  })
  boi: string;

  @Column({
    type: DataType.TEXT,
  })
  photo_url: string;
}
