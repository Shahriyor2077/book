import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { MailModule } from "./mail/mail.module";
import { AdminModule } from "./admin/admin.module";
import { Admin } from "./admin/models/admin.model";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.constants";
import { BotModule } from './bot/bot.module';
import { GenreModule } from './genre/genre.module';
import { Genre } from "./genre/models/genre.model";
import { LanguagesModule } from './languages/languages.module';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { Author } from "./authors/models/author.model";
import { Language } from "./languages/models/language.model";
import { Categories } from "./categories/models/category.model";

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory:()=>({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule]
      }),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),

    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Admin, Genre, Author, Language, Categories],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },  
    }),

    UsersModule,

    AuthModule,

    MailModule,

    AdminModule,

    BotModule,

    GenreModule,

    LanguagesModule,

    AuthorsModule,

    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
