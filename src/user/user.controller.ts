import { CreateUserDto } from './dto/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get(':id')
  async getOneUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.getOneUser(id);
  }

  @Put(':id')
  async updateUserById(
    @Param('id')
    id: string,
    @Body()
    user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUserById(id, user);
  }

  @Delete(':id')
  async deleteUserById(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
