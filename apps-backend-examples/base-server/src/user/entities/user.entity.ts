import { DomainEntity } from '@BE-common/base/domain-entity';
import { Id } from '@BE-common/base/schema';
import { userSchema } from '@schema/user/user.schema';
import { z } from 'zod';

export type UserProperty = z.infer<typeof userSchema>;

export class User extends DomainEntity<UserProperty> implements UserProperty {
  id!: Id;
  age!: number;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  email?: string;

  protected initialize() {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
