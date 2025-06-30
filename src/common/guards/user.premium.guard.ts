import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class PremiumGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest()

        if(!req.user){
            throw new UnauthorizedException("User ro'yxatdan o'tmagan")
        }

        if(!req.user.is_premium){
            throw new BadRequestException("Premium obunaga ega emassiz")
        }
        return true;
    }
}