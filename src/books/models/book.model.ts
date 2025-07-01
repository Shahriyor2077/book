import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { BookVersion } from "../../book-version/models/book-version.model";

export interface IBookCreationAttr {
  publisher_year: string;
  authorId: number;
}

@Table({ tableName: "books" })
export class Book extends Model<Book, IBookCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  publisher_year: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @HasMany(() => BookVersion)
  bookVersions: BookVersion[];
}
