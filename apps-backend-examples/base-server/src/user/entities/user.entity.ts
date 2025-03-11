import { UserProperty } from 'schema/user/schema';
import { Id } from 'schema/identifier';
import { DomainEntity } from 'backend-common/common/entity';

export class User extends DomainEntity<UserProperty> implements UserProperty {
  id!: Id;
  age!: number;
  name!: string;
  email?: string;
}
