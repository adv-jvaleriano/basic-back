import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';

import { ACHIEVEMENT, HTTP_HEADERS } from 'src/constants';

@Injectable()
export class LabelingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response: Response = context.switchToHttp().getResponse();
    response.setHeader(HTTP_HEADERS.ACHIEVEMENT, ACHIEVEMENT);

    return next.handle();
  }
}
