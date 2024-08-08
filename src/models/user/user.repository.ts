import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/res-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByUsernameOrEmail(username: string): Promise<User> {
    return await this.userModel.findOne(
      {
        $or: [
          {
            email: username,
          },
          {
            username: username,
          },
        ],
      },
    );
  }

  async findOneByEmail(email: string): Promise<ResponseUserDto> {
    return await this.userModel.findOne(
      { email },
      {
        username: true,
        firstName: true,
        lastName: true,
      },
    );
  }

  async findOneByUsername(username: string): Promise<ResponseUserDto> {
    return await this.userModel.findOne(
      { username },
      {
        username: true,
        firstName: true,
        lastName: true,
      },
    );
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findCode(userId: number): Promise<{ code: string }> {
    return await this.userModel.findById(userId, {
      code: true,
    });
  }

  async insertCode(userId: number, code: string): Promise<string> {
    return await this.userModel.findByIdAndUpdate(userId, {
      code,
    });
  }
}
