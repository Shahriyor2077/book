import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface IAudioBookCreationAttr{
    book_version_id: number;
    narrator_name: string;
    total_duration: number
    total_size_mg: number
}

@Table({ tableName: "audio_book" })
export class AudioBook extends Model<AudioBook, IAudioBookCreationAttr> {
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
  declare narrator_name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare total_duration: number;

  @Column({
    type: DataType.DECIMAL,
  })
  declare total_size_mb: number;
}
