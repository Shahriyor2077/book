import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  Req,
  Get,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SigninUserDto } from "../users/dto/signin-user.dto";
import { Response, Request } from "express";
import { CookieGetter } from "src/common/decorators/cookie-getter.decorators";

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
  signout(
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({passthrough: true}) res:Response
  ){
    return this.authService.signout(refreshToken, res)
  }


  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refresh(id, refreshToken, res);
  }

  // @HttpCode(200)
  // @Get("activate/:link")
  // activate(@Param("link") link: string) {
  //   return this.authService.activate(link);
  // }
}
