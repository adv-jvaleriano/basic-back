import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { HTTP_HEADERS, ORIGIN_LOG } from '../constants';

@Injectable()
export class OriginLogMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(ORIGIN_LOG);

  use(req: Request, res: Response, next: NextFunction) {
    const requestOrigin: string = req.headers.origin;

    this.logger.verbose(
      requestOrigin ? requestOrigin : req.headers[HTTP_HEADERS.USER_AGENT],
    );

    next();
  }
}
