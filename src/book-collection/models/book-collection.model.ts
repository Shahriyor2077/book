import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "src/books/models/book.model";
import { Collection } from "src/collection/models/collection.model";

interface IBookControllerCreationAttr {
  collectionId: number;
  bookId: number;
}

@Table({ tableName: "book_collections" })
export class BookCollection extends Model<
  BookCollection,
  IBookControllerCreationAttr
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Collection)
  @Column({
    type: DataType.INTEGER,
  })
  declare collectionId: number;

  @BelongsTo(() => Collection)
  collection: Collection;

  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
  })
  declare bookId: number;

  @BelongsTo(() => Book)
  book: Book;
}
