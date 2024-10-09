import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { User } from './entities/user.entity';
import { EMPLOYEE_USER_CREATION } from 'src/constants';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user: User = this.userRepository.create({
        username: createEmployeeDto.username,
        email: createEmployeeDto.email,
      });
      const savedUser: User = await queryRunner.manager.save(User, user);

      const employee: Employee = this.employeeRepository.create({
        firstname: createEmployeeDto.firstname,
        lastname: createEmployeeDto.lastname,
        genre: createEmployeeDto.genre,
        user: savedUser,
      });

      await queryRunner.manager.save(Employee, employee);

      await queryRunner.commitTransaction();

      return {
        data: {
          employee,
          user,
        },
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException(EMPLOYEE_USER_CREATION);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(data: unknown) {
    try {
      console.log(typeof data);
      throw new Error('Employee error');
      return this.employeeRepository.find();
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: string) {
    return this.employeeRepository.findBy({ id });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(id, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.employeeRepository.delete(id);
  }
}
