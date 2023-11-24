import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}
  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      request = host.getRequest();
    const user = request['user'];
    const isAllowed = this.isAllowed(user.roles);
    if (!isAllowed) {
      console.log('user is authenticated but  not authorized ');
      throw new ForbiddenException();
    }

    return true;
  }
  isAllowed(userRoles: string[]) {
    let allowed = false;
    userRoles.map((role) => {
      if (!allowed && this.allowedRoles.includes(role)) {
        allowed = true;
      }
    });
    return allowed;
  }
}
