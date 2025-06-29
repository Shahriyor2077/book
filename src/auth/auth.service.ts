import {
  ConflictException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import { Response, Request } from "express";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      is_active: user.is_active,
      is_premium: user.is_premium,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const candidate = await this.usersService.findUserByEmail(
      createUserDto.email
    );
    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }
    const newUser = await this.usersService.create(createUserDto);
    try {
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }

    return {
      message:
        "Ro'yxatdan o'tdingiz. Accountni faollashtirish uchun emailni tasdiqlang!",
    };
  }

  async signin(signinUserDto: SigninUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(signinUserDto.email);

    if (!user) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinUserDto.password,
      user.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    user.save();

    res.cookie("refreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return { message: "Tizimga xush kelibsiz", id: user.id, accessToken };
  }

  async signout(req: Request, res: Response) {
    res.clearCookie("refreshToken");

    return { message: "Tizimdan chiqdingiz" };
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        throw new UnauthorizedException("Refresh token topilmadi");
      }

      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });

      const user = await this.usersService.findOne(payload.id);

      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      const isMatched = await bcrypt.compare(refreshToken, user.refresh_token);

      if (!isMatched) {
        throw new UnauthorizedException("Noto'g'ri refresh token");
      }

      const tokens = await this.generateTokens(user);

      user.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      await user.save();

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: +process.env.COOKIE_TIME!,
        httpOnly: true,
      });

      return {
        message: "Token yangilandi",
        accessToken: tokens.accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException("Refresh token noto'g'ri");
    }
  }

  async activate(link: string) {
    try {
      const user = await this.usersService.findUserByActivationLink(link);

      if (!user) {
        throw new UnauthorizedException("Noto'g'ri activation link");
      }

      if (user.is_active) {
        return { message: "Account allaqachon faollashtirilgan" };
      }

      user.is_active = true;
      await user.save();

      return { message: "Account muvaffaqiyatli faollashtirildi" };
    } catch (error) {
      throw new UnauthorizedException("Account faollashtirishda xatolik");
    }
  }
}
