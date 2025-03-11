import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserProperty } from 'schema/user/schema';

@Entity()
export class UserPersistence implements Partial<UserProperty> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  age!: number;
}
