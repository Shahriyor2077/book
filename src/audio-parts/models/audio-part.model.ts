import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IAudioPartsCreationAttr{
    audio_book_id: number;
    title: string;
    file_url: string;
    duration: number;
    size_mb: number;
    order_index: number;
}

@Table({ tableName: "audio_parts" })
export class AudioPart extends Model<AudioPart, IAudioPartsCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare audio_book_id: number;

  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @Column({
    type: DataType.TEXT,
  })
  declare file_url: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare duration: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare size_mb: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare order_index: number;
}
