import { Id, StrictPropsMatch } from '@BE-common/base/schema';
import { Entity } from '@BE-common/base/entity';
import { UserProperty } from '@schema/user/user.schema';

export class User extends Entity {
  id!: Id;
  age!: number;
  firstName!: string;
  lastName!: string;
  fullName!: string;
  email?: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _checkSchema: StrictPropsMatch<UserProperty, User> = true;
