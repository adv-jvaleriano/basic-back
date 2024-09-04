import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

import { HTTP_HEADERS, READ_ONLY_USER } from 'src/constants';

@Injectable()
export class ChangeRecordsGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const isEditor: boolean = Boolean(request.headers[HTTP_HEADERS.EDITOR]);

    if (!isEditor) {
      throw new ForbiddenException(READ_ONLY_USER);
    }

    return isEditor;
  }
}
