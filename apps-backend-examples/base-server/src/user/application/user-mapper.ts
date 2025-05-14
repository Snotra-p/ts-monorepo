import { UserPersistence } from '../infrastructure/persistence/user.persistence';
import { User } from '../entities/user.entity';
import { UserProperty, userSchema } from '@schema/user/user.schema';
import { UserDto, userDtoSchema } from '@schema/user/dto/user.dto';

export class UserMapper {
  static fromPersistence(persistence: UserPersistence): User {
    const userProperty = {
      ...persistence,
      fullName: persistence.firstName + ' ' + persistence.lastName,
    } satisfies UserProperty;

    return User.create(userSchema.parse(userProperty));
  }

  static toDto(user: User): UserDto {
    const userDto = { ...user } satisfies UserDto;
    return userDtoSchema.parse(userDto);
  }
}
