import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  ExceptionFilter,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { User } from './user.model';
import { UserService } from './user.service';
import { DNE } from 'src/utils';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    console.log(id);

    return this.userService.findOneID(id);
  }

  @Post('/login')
  async login(@Body() user: User) {
    if (DNE(user, 'username')) {
      throw new HttpException('Missing username', HttpStatus.BAD_REQUEST);
    }

    try {
      const foundUser = await this.userService.findOne(user.username);

      if (!foundUser) {
        return await this.userService.create(user);
      }

      return foundUser;
    } catch (error) {
      throw new HttpException(
        `Failed to login in user ${JSON.stringify(user)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/create')
  async create(@Body() user: User) {
    const { username } = user;

    if (DNE(user, 'username')) {
      throw new HttpException(
        `Missing user object or username`,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const duplicateUser = await this.userService.findOne(username);

      if (duplicateUser) {
        throw new HttpException(
          `Duplicate username '${username}'`,
          HttpStatus.CONFLICT,
        );
      }
    } catch (error) {
      console.log({
        error,
      });

      if (error.status && error.status === 409) {
        throw new HttpException(
          `Duplicate username '${username}'`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          `Could not find user ???`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.userService.create(user);
  }

  @Post(':id')
  delete(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }
}
