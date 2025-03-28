import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './application/user.service';
import { CreateUserInDto } from '@schema/user/dto/create-user-in.dto';
import { UpdateUserInDto } from '@schema/user/dto/update-user-in.dto';
import { ApiDocs } from '@BE-common/decorator/api-response-docs.decorator';
import {
  BASE_SERVER_ERROR,
  BASE_SERVER_ERROR_KEY,
} from '@schema/exception/base-server-error';
import { UserDto } from '@schema/user/dto/user.dto';
import { ApiErrorDocs } from '@BE-common/decorator/api-error-docs.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiDocs({
    bodyType: CreateUserInDto,
    responseType: UserDto,
    summary: '사용자 생성',
  })
  @ApiErrorDocs(BASE_SERVER_ERROR, [BASE_SERVER_ERROR_KEY.USER_NOT_FOUND])
  create(@Query() createUserDto: CreateUserInDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserInDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
