
import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface ILanguagesCreationAttr{
    code: string;
    name: string;
    flag: string
}

@Table({ tableName: "languages" })
export class Language extends Model<Language, ILanguagesCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING()
  })
  code :string

  @Column({
    type: DataType.STRING()
  })

  name :string
  
  @Column({
    type: DataType.STRING()
  })
  flag :string


}
