import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Book } from "./models/book.model";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private readonly bookModel: typeof Book
  ) {}

  async create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto as any);
  }

  async findAll() {
    return this.bookModel.findAll();
  }

  async findOne(id: number) {
    return this.bookModel.findByPk(id);
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookModel.findByPk(id);
    if (!book) return null;
    return book.update(updateBookDto as any);
  }

  async remove(id: number) {
    const book = await this.bookModel.findByPk(id);
    if (!book) return { deleted: false };
    await book.destroy();
    return { deleted: true };
  }
}
