import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ChangeRecordsGuard } from '../guards/change-records.guard';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { LabelingInterceptor } from '../interceptors/labeling.interceptor';
import { ROUTE_PATH_PREFIX } from '../constants';
import { GenreTransformPipe } from 'src/pipes/genre-transform.pipe';

@Controller(ROUTE_PATH_PREFIX.EMPLOYEES)
@UseInterceptors(LabelingInterceptor)
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseGuards(ChangeRecordsGuard)
  create(@Body(GenreTransformPipe) createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ChangeRecordsGuard)
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @UseGuards(ChangeRecordsGuard)
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
