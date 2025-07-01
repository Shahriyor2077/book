import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const admin = req.admin;
    if (!admin) {
      throw new UnauthorizedException("Admin aniqlanmadi");
    }
    if (admin.role !== "super_admin" && admin.role !== "creator") {
      throw new ForbiddenException(
        "Faqat super admin yoki creator ruxsat etiladi"
      );
    }
    return true;
  }
}
