import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(JSON.parse(request.headers.user));
    const user = JSON.parse(request.headers.user);
    const has_role = () =>
      user.roles.some((role: string) => !!roles.find((item) => item === role));

    return user && user.roles && has_role();
  }
}
