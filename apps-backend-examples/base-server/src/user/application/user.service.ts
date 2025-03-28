import { Injectable } from '@nestjs/common';
import { CreateUserInDto } from '@schema/user/dto/create-user-in.dto';
import { UpdateUserInDto } from '@schema/user/dto/update-user-in.dto';
import { UserPersistence } from '../infrastructure/persistence/user.persistence';
import { UserMapper } from './user-mapper';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserInDto) {
    const userPersistence = new UserPersistence();

    const user = UserMapper.fromPersistence(userPersistence);

    return UserMapper.toDto(user);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserInDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
