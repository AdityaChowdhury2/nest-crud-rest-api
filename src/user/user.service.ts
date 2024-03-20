import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAllUsers(): Promise<User[]> {
    const allUsers = await this.userModel.find().exec();
    if (!allUsers.length) throw new NotFoundException('No users found');
    return allUsers;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ email: user.email });

    if (existingUser) {
      return existingUser;
    }

    return await this.userModel.create(user);
  }
  async getOneUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserById(id: string, user: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
        runValidators: true,
      })
      .exec();
    if (!updatedUser) throw new NotFoundException('User not found');
    return updatedUser;
  }

  async deleteUserById(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) throw new NotFoundException('User not found');
    return deletedUser;
  }
}
