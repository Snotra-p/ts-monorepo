import { Injectable } from '@nestjs/common';
import { CreateUserInDto } from '@schema/user/dto/create-user-in.dto';
import { UpdateUserInDto } from '@schema/user/dto/update-user-in.dto';
import { UserMapper } from './user-mapper';
import { UserPersistence } from '../infrastructure/persistence/user.persistence';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserInDto) {
    const user = UserMapper.fromPersistence(new UserPersistence());

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
