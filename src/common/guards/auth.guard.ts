import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";



@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: any = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException("Unauthorized user");
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token)
      throw new UnauthorizedException("Unauthorized user");

    let payload: any;
    try {
      payload = await this.jwtService.verify(token, {
        secret: process.env.ADMIN_ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException("Token noto'g'ri");
    }

    if (
      !payload ||
      !payload.is_active ||
      (payload.role !== "admin" && payload.role !== "super_admin")
    ) {
      throw new ForbiddenException("Sizda admin ruxsati yo'q");
    }
    req.user = payload;
    return true;
  }
}



