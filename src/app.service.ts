import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { WORK_DAY_THOUGHTS_BY_TIME, WORK_DAY_THOUGHTS } from './constants';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(WORK_DAY_THOUGHTS);

  @Cron(CronExpression.EVERY_SECOND)
  handleWorkDayThoughts() {
    const seconds: number = new Date().getSeconds();

    if (!WORK_DAY_THOUGHTS_BY_TIME[seconds]) return;

    this.logger.debug(WORK_DAY_THOUGHTS_BY_TIME[seconds]);
  }
}
