import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

import { AWARDS, HTTP_HEADERS } from 'src/constants';

@Injectable()
export class AwardsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();

    return next
      .handle()
      .pipe(
        tap(() =>
          response.setHeader(HTTP_HEADERS.AWARDS, JSON.stringify(AWARDS)),
        ),
      );
  }
}
