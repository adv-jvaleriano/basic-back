import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { MAINTENANCE_MESSAGE } from '../constants';
import { isUnderMaintenance } from '../utils/app-status';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (isUnderMaintenance()) {
      return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
        message: MAINTENANCE_MESSAGE,
      });
    }

    next();
  }
}
