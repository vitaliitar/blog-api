import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getById(@Param('id') userId: string) {
    return await this.userService.getById(userId);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Put(':id')
  async update(@Param('id') userId: string, @Body() body: CreateUserDto) {
    return await this.userService.update(userId, body);
  }

  @Delete(':id')
  async delete(@Param('id') userId: string) {
    return await this.userService.delete(userId);
  }
}
