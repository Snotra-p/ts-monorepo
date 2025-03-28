import { Id } from '@BE-common/base/schema';
import { UserProperty } from '@schema/user/user.schema';

export class User implements UserProperty {
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
