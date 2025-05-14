import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserPersistenceProperty } from '@schema/user/user.schema';

@Entity()
export class UserPersistence implements UserPersistenceProperty {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @CreateDateColumn({
    type: 'datetime',
  })
  createdAt!: Date;
}
