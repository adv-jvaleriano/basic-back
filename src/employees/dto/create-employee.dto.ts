import { IsEmail, IsIn, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  @IsIn(['male', 'female', 'x'])
  genre: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;
}
