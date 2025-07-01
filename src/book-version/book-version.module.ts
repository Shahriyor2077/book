import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookVersion } from "./models/book-version.model";
import { BookVersionService } from "./book-version.service";
import { BookVersionController } from "./book-version.controller";

@Module({
  imports: [SequelizeModule.forFeature([BookVersion])],
  controllers: [BookVersionController],
  providers: [BookVersionService],
  exports: [BookVersionService],
})
export class BookVersionModule {}
