import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { FINISH_PETITION, LOGGIN_LOG, START_PETITION } from '../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LOGGIN_LOG);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log(START_PETITION);
    const startTime: number = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(`${FINISH_PETITION} ${Date.now() - startTime}ms`),
        ),
      );
  }
}
