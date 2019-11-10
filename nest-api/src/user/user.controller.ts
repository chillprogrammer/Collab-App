import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: InMemoryDBService<UserEntity>) {}

  @Get()
  getAllUsers(): UserEntity[] {
    return this.userService.getAll();
  }

  @Get('/user/:id')
  getUser(@Param('id') id: string): UserEntity {
    return this.userService.get(+id);
  }

  @Post()
  addUser(@Body() user: UserEntity) {
    this.userService.create(user);
  }
}
