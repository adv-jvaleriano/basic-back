import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { AuthGuard } from '../guards/auth.guard';
import { EmployeesService } from './employees.service';
import { UserService } from './users.service';
import { EmployeesController } from './employees.controller';
import { UsersController } from './users.controller';
import { Employee } from './entities/employee.entity';
import { User } from './entities/user.entity';
import { LabelingInterceptor } from '../interceptors/labeling.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, User]),
    ScheduleModule.forRoot(),
  ],
  controllers: [EmployeesController, UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LabelingInterceptor,
    },
    EmployeesService,
    UserService,
  ],
})
export class EmployeesModule {}
