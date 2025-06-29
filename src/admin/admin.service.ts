import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Admin } from "./models/admin.model";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SigninAdminDto } from "./dto/signin-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response, Request } from "express";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      role: admin.role,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret:
          process.env.ADMIN_ACCESS_TOKEN_KEY || process.env.ACCESS_TOKEN_KEY,
        expiresIn:
          process.env.ADMIN_ACCESS_TOKEN_TIME || process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret:
          process.env.ADMIN_REFRESH_TOKEN_KEY || process.env.REFRESH_TOKEN_KEY,
        expiresIn:
          process.env.ADMIN_REFRESH_TOKEN_TIME ||
          process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(createAdminDto: CreateAdminDto) {
    const candidate = await this.findAdminByEmail(createAdminDto.email);
    if (candidate) {
      throw new ConflictException("Bunday admin mavjud");
    }

    const { password, confirm_password } = createAdminDto;
    if (password !== confirm_password) {
      throw new ConflictException("Parollar mos emas");
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      password: hashed_password,
    });

    return {
      message: "Admin muvaffaqiyatli yaratildi",
      admin: {
        id: newAdmin.id,
        full_name: newAdmin.full_name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    };
  }

  async signin(signinAdminDto: SigninAdminDto, res: Response) {
    const admin = await this.findAdminByEmail(signinAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const isMatched = await bcrypt.compare(
      signinAdminDto.password,
      admin.password
    );

    if (!isMatched) {
      throw new UnauthorizedException("Email yoki password noto'g'ri");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    admin.save();

    res.cookie("adminRefreshToken", refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });

    return {
      message: "Admin paneliga xush kelibsiz",
      id: admin.id,
      role: admin.role,
      accessToken,
    };
  }

  async signout(req: Request, res: Response) {
    res.clearCookie("adminRefreshToken");

    return { message: "Admin panelidan chiqdingiz" };
  }

  async refresh(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.adminRefreshToken;

      if (!refreshToken) {
        throw new UnauthorizedException("Refresh token topilmadi");
      }

      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret:
          process.env.ADMIN_REFRESH_TOKEN_KEY || process.env.REFRESH_TOKEN_KEY,
      });

      const admin = await this.findOne(payload.id);

      if (!admin) {
        throw new UnauthorizedException("Admin topilmadi");
      }

      const isMatched = await bcrypt.compare(refreshToken, admin.refresh_token);

      if (!isMatched) {
        throw new UnauthorizedException("Noto'g'ri refresh token");
      }

      const tokens = await this.generateTokens(admin);

      admin.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      await admin.save();

      res.cookie("adminRefreshToken", tokens.refreshToken, {
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

  async getProfile(req: Request) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException("Authorization header topilmadi");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("Token topilmadi");
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret:
          process.env.ADMIN_ACCESS_TOKEN_KEY || process.env.ACCESS_TOKEN_KEY,
      });

      const adminProfile = await this.findOne(payload.id);

      const { password, refresh_token, ...profile } = adminProfile.toJSON();

      return { message: "Admin profile ma'lumotlari", profile };
    } catch (error) {
      throw new UnauthorizedException("Profile ma'lumotlarini olishda xatolik");
    }
  }

  async updateProfile(req: Request, updateAdminDto: UpdateAdminDto) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException("Authorization header topilmadi");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("Token topilmadi");
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret:
          process.env.ADMIN_ACCESS_TOKEN_KEY || process.env.ACCESS_TOKEN_KEY,
      });

      const updatedAdmin = await this.update(payload.id, updateAdminDto);

      const { password, refresh_token, ...profile } = updatedAdmin.toJSON();

      return { message: "Admin profile yangilandi", profile };
    } catch (error) {
      throw new UnauthorizedException("Profile yangilashda xatolik");
    }
  }

  async deleteProfile(req: Request) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        throw new UnauthorizedException("Authorization header topilmadi");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("Token topilmadi");
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret:
          process.env.ADMIN_ACCESS_TOKEN_KEY || process.env.ACCESS_TOKEN_KEY,
      });

      await this.remove(payload.id);

      return { message: "Admin profile o'chirildi" };
    } catch (error) {
      throw new UnauthorizedException("Profile o'chirishda xatolik");
    }
  }

  async getAllUsers() {
    try {
      const users = await this.userModel.findAll();

      const cleanUsers = users.map((user) => {
        const { password, refresh_token, ...cleanUser } = user.toJSON();
        return cleanUser;
      });

      return { message: "Barcha foydalanuvchilar", users: cleanUsers };
    } catch (error) {
      throw new UnauthorizedException("Foydalanuvchilarni olishda xatolik");
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      const { password, refresh_token, ...cleanUser } = user.toJSON();

      return { message: "Foydalanuvchi ma'lumotlari", user: cleanUser };
    } catch (error) {
      throw new UnauthorizedException("Foydalanuvchi topilmadi");
    }
  }

  async updateUser(id: number, updateUserDto: any) {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 7);
      }

      await user.update(updateUserDto);

      const { password, refresh_token, ...cleanUser } = user.toJSON();

      return { message: "Foydalanuvchi yangilandi", user: cleanUser };
    } catch (error) {
      throw new UnauthorizedException("Foydalanuvchi yangilashda xatolik");
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userModel.findByPk(id);

      if (!user) {
        throw new UnauthorizedException("Foydalanuvchi topilmadi");
      }

      await user.destroy();

      return { message: "Foydalanuvchi o'chirildi" };
    } catch (error) {
      throw new UnauthorizedException("Foydalanuvchi o'chirishda xatolik");
    }
  }

  async getAllAdmins() {
    try {
      const admins = await this.adminModel.findAll();

      const cleanAdmins = admins.map((admin) => {
        const { password, refresh_token, ...cleanAdmin } = admin.toJSON();
        return cleanAdmin;
      });

      return { message: "Barcha adminlar", admins: cleanAdmins };
    } catch (error) {
      throw new UnauthorizedException("Adminlarni olishda xatolik");
    }
  }

  async getAdminById(id: number) {
    try {
      const admin = await this.findOne(id);

      const { password, refresh_token, ...cleanAdmin } = admin.toJSON();

      return { message: "Admin ma'lumotlari", admin: cleanAdmin };
    } catch (error) {
      throw new UnauthorizedException("Admin topilmadi");
    }
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const updatedAdmin = await this.update(id, updateAdminDto);

      const { password, refresh_token, ...cleanAdmin } = updatedAdmin.toJSON();

      return { message: "Admin yangilandi", admin: cleanAdmin };
    } catch (error) {
      throw new UnauthorizedException("Admin yangilashda xatolik");
    }
  }

  async deleteAdmin(id: number) {
    try {
      await this.remove(id);

      return { message: "Admin o'chirildi" };
    } catch (error) {
      throw new UnauthorizedException("Admin o'chirishda xatolik");
    }
  }

  async getStats() {
    try {
      const [usersCount, adminsCount] = await Promise.all([
        this.userModel.count(),
        this.adminModel.count(),
      ]);

      return {
        message: "Statistika ma'lumotlari",
        stats: {
          total_users: usersCount,
          total_admins: adminsCount,
          total_accounts: usersCount + adminsCount,
        },
      };
    } catch (error) {
      throw new UnauthorizedException("Statistika olishda xatolik");
    }
  }

  async getUserStats() {
    try {
      const [totalUsers, activeUsers, premiumUsers] = await Promise.all([
        this.userModel.count(),
        this.userModel.count({ where: { is_active: true } }),
        this.userModel.count({ where: { is_premium: true } }),
      ]);

      return {
        message: "Foydalanuvchilar statistikasi",
        stats: {
          total_users: totalUsers,
          active_users: activeUsers,
          premium_users: premiumUsers,
          inactive_users: totalUsers - activeUsers,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(
        "Foydalanuvchilar statistikasini olishda xatolik"
      );
    }
  }

  async getAdminStats() {
    try {
      const [totalAdmins, activeAdmins, superAdmins] = await Promise.all([
        this.adminModel.count(),
        this.adminModel.count({ where: { is_active: true } }),
        this.adminModel.count({ where: { role: "super_admin" } }),
      ]);

      return {
        message: "Adminlar statistikasi",
        stats: {
          total_admins: totalAdmins,
          active_admins: activeAdmins,
          super_admins: superAdmins,
          inactive_admins: totalAdmins - activeAdmins,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(
        "Adminlar statistikasini olishda xatolik"
      );
    }
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id);

    if (!admin) {
      throw new UnauthorizedException(`Admin with ID ${id} not found`);
    }

    return admin;
  }

  async findAdminByEmail(email: string) {
    return this.adminModel.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    if (updateAdminDto.password) {
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, 7);
    }

    await admin.update(updateAdminDto);

    return admin;
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await admin.destroy();
    return { message: "Admin o'chirildi" };
  }
}
