import { Injectable } from "@nestjs/common";
import { CreateBookMarkDto } from "./dto/create-book-mark.dto";
import { UpdateBookMarkDto } from "./dto/update-book-mark.dto";
import { InjectModel } from "@nestjs/sequelize";
import { BookMark } from "./models/book-mark.model";

@Injectable()
export class BookMarksService {
  constructor(
    @InjectModel(BookMark) private readonly bookMarksModel: typeof BookMark
  ) {}
  create(createBookMarkDto: CreateBookMarkDto) {
    return this.bookMarksModel.create(createBookMarkDto);
  }

  findAll() {
    return this.bookMarksModel.findAll();
  }

  findOne(id: number) {
    return this.bookMarksModel.findByPk(id);
  }

  update(id: number, updateBookMarkDto: UpdateBookMarkDto) {
    return this.bookMarksModel.update(updateBookMarkDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.bookMarksModel.destroy({ where: { id } });
  }
}
