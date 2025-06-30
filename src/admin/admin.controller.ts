import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Req,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { SigninAdminDto } from "./dto/signin-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { Response, Request } from "express";

@Controller("admin")
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post("signup")
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.signup(createAdminDto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() signinAdminDto: SigninAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminService.signin(signinAdminDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  signout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminService.signout(req, res);
  }

  @HttpCode(200)
  @Get("refresh")
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.adminService.refresh(req, res);
  }

  @Get("users")
  getAllUsers() {
    return this.adminService.getAllUsers();
  }

  @Get("users/:id")
  getUserById(@Param("id") id: string) {
    return this.adminService.getUserById(+id);
  }

  @Put("users/:id")
  updateUser(@Param("id") id: string, @Body() updateUserDto: any) {
    return this.adminService.updateUser(+id, updateUserDto);
  }

  @Delete("users/:id")
  deleteUser(@Param("id") id: string) {
    return this.adminService.deleteUser(+id);
  }

  @Get("admins")
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get("admins/:id")
  getAdminById(@Param("id") id: string) {
    return this.adminService.getAdminById(+id);
  }

  @Put("admins/:id")
  updateAdmin(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @Delete("admins/:id")
  deleteAdmin(@Param("id") id: string) {
    return this.adminService.deleteAdmin(+id);
  }
}
