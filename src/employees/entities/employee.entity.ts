import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';
import { ENTITIES } from '../../constants';

@Entity(ENTITIES.EMPLOYEE)
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  firstname: string;

  @Column('text', { nullable: false })
  lastname: string;

  @Column('text', { nullable: false })
  genre: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
