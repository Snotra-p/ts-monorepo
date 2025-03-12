import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { z } from 'zod';
import { userPersistenceSchema } from '@schema/user/user.schema';

export type UserPropertyPersistence = z.infer<typeof userPersistenceSchema>;

@Entity()
export class UserPersistence implements UserPropertyPersistence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  age!: number;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;
}
