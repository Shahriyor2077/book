import { Module } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { JwtModule } from "@nestjs/jwt";
import { SequelizeModule } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import { User } from "../users/models/user.model";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Admin, User]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
