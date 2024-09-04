import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { HTTP_HEADERS, WITHOUT_TOKEN } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const authToken: string = request.headers[
      HTTP_HEADERS.AUTHORIZATION
    ] as string;

    if (!authToken) {
      throw new UnauthorizedException(WITHOUT_TOKEN);
    }

    return Boolean(authToken);
  }
}
