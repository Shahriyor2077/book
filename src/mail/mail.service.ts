import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/models/user.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(
    user: { email: string; full_name: string; activation_link: string },
    type: "user" | "admin" = "user"
  ) {
    const url =
      type === "admin"
        ? `${process.env.api_url}/api/admin/activate/${user.activation_link}`
        : `${process.env.api_url}/api/auth/activate/${user.activation_link}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to InBook App!",
      template: "./confirmation",
      context: {
        username: user.full_name,
        url,
      },
    });
  }
}
