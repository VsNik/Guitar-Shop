import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization?.split(' ')[1];

    if (header) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
