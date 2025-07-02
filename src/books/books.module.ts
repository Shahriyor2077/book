import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Book } from "./models/book.model";
import { BookCollection } from "../book-collection/models/book-collection.model";

@Module({
    imports: [SequelizeModule.forFeature([Book, BookCollection])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
