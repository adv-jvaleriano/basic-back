import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ENTITIES } from '../../constants';

@Entity(ENTITIES.USER)
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text', { nullable: false })
  username: string;

  @Column('text', { nullable: false, unique: true })
  email: string;
}
