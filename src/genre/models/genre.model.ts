import {  Column, DataType, Model, Table } from "sequelize-typescript";

export interface IGenreCreationAttr{
    name: string
}

@Table({tableName: "genre"})

export class Genre extends Model<Genre, IGenreCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    declare id: number

    @Column({
        type: DataType.STRING(20),
    })
    name: string
}
