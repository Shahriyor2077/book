import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Book } from "../../books/models/book.model";

export interface IBookVersionCreationAttr {
  book_id: number;
  language_id: number;
  title: string;
  description: string;
  text_url: string;
  cover_url: string;
}

@Table({ tableName: "book_versions" })
export class BookVersion extends Model<BookVersion, IBookVersionCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  language_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text_url: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cover_url: string;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  book_id: number;

  @BelongsTo(() => Book)
  book: Book;
}
