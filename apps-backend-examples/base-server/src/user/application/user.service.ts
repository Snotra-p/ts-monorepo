import { Injectable } from '@nestjs/common';

import { UpdateUserInDto } from 'schema/user/dto/update-user-in.dto';
import { CreateUserInDto } from 'schema/user/dto/create-user-in.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserInDto) {
    return 'This action adds a new user';
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
