import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Req,
  Get,
  Param,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import { Response, Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @HttpCode(200)
  @Post("signin")
  signin(
    @Body() signinUserDto: SigninUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signin(signinUserDto, res);
  }

  @HttpCode(200)
  @Post("signout")
  signout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.signout(req, res);
  }

  @HttpCode(200)
  @Get("refresh")
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res);
  }

  @HttpCode(200)
  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.authService.activate(link);
  }
}
