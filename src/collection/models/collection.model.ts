import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { BookCollection } from "src/book-collection/models/book-collection.model";

interface ICollectionCreationAttr{
    title: string;
    description: string;
    coverImageUrl: string;
    createdBy: number;
    isPublic: boolean;
    isPremiumOnyl: boolean;
    isPremium: boolean
}

@Table({ tableName: "collection" })
export class Collection extends Model<Collection, ICollectionCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING(100),
  })
  coverImageUrl: string;

  @Column({
    type: DataType.INTEGER,
  })
  createdBy: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPublic: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPremiumOnyl: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isPremium: boolean;

  @HasMany(()=>BookCollection)
  bookCollection: BookCollection[]

}
