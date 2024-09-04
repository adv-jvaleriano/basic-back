import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { EmployeesModule } from './employees/employees.module';
import { AppService } from './app.service';
import { getTypeOrmConfig } from './config/type-orm.config';
import { OriginLogMiddleware } from './middlewares/origin-log.middleware';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ORIGIN_LOG_ROUTES } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(getTypeOrmConfig(process.env)),
    EmployeesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(OriginLogMiddleware).forRoutes(...ORIGIN_LOG_ROUTES);
  }
}
