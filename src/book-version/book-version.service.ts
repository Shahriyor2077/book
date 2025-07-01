import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BookVersion } from "./models/book-version.model";
import { CreateBookVersionDto } from "./dto/create-book-version.dto";
import { UpdateBookVersionDto } from "./dto/update-book-version.dto";

@Injectable()
export class BookVersionService {
  constructor(
    @InjectModel(BookVersion)
    private readonly bookVersionModel: typeof BookVersion
  ) {}

  async create(createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionModel.create(createBookVersionDto as any);
  }

  async findAll() {
    return this.bookVersionModel.findAll();
  }

  async findOne(id: number) {
    return this.bookVersionModel.findByPk(id);
  }

  async update(id: number, updateBookVersionDto: UpdateBookVersionDto) {
    const version = await this.bookVersionModel.findByPk(id);
    if (!version) return null;
    return version.update(updateBookVersionDto as any);
  }

  async remove(id: number) {
    const version = await this.bookVersionModel.findByPk(id);
    if (!version) return { deleted: false };
    await version.destroy();
    return { deleted: true };
  }
}
