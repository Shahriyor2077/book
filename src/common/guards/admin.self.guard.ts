
import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class AdminSelfGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req=context.switchToHttp().getRequest();
        const admin=req.admin;
        const paramId=req.params.id;

        if(!admin){
            throw new UnauthorizedException("admin mavjud eams")
        }
        if(!paramId){
            throw new UnauthorizedException("Id parametri yoq")
        }
        if(String(admin.id)!==String(paramId)){
            throw new ForbiddenException("Ruxsat etilmagan foydalanuvchi")
        }
        return true
    }
}