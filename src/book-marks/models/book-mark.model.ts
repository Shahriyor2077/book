import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "../../books/models/book.model";

interface IBookMarksCreationAttr {
  userId: number;
  bookId: number;
  note: string;
  position: string;
}

@Table({ tableName: "book_marks" })
export class BookMark extends Model<BookMark, IBookMarksCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  bookId: number;

  @BelongsTo(() => Book)
  book: Book;

  @Column({
    type: DataType.STRING(100),
  })
  note: string;

  @Column({
    type: DataType.STRING(100),
  })
  position: string;
}
