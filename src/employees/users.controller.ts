import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeRecordsGuard } from '../guards/change-records.guard';
import { AwardsInterceptor } from '../interceptors/awards.interceptor';
import { ROUTE_PATH_PREFIX } from '../constants';

@Controller(ROUTE_PATH_PREFIX.USERS)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(ChangeRecordsGuard)
  @UseInterceptors(AwardsInterceptor)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseInterceptors(AwardsInterceptor)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ChangeRecordsGuard)
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(ChangeRecordsGuard)
  remove(@Param('id') id: number) {
    return 'this.userService.remove(id)';
  }
}
