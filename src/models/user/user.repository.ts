import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import {
  ResponseUserDto,
  CreateUserDto,
  ResponseCodeDto,
  ResponseLotDto,
} from './dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByUsernameOrEmail(username: string): Promise<User> {
    return await this.userModel.findOne({
      $or: [
        {
          email: username,
        },
        {
          username: username,
        },
      ],
    });
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

  async findCodeByUsername(username: string): Promise<ResponseCodeDto> {
    return await this.userModel.findOne({ username }, { code: true });
  }

  async findOneByCode(code: string): Promise<{ username: string }> {
    return await this.userModel.findOne({ code }, { username: true });
  }

  async insertCode(username: string, code: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ username }, { code });
  }

  async findLotByUsername(username: string): Promise<ResponseLotDto> {
    return await this.userModel.findOne({ username }, { lot: true });
  }

  async insertCommissionUser(
    username: string,
    commissionUsername: string,
  ): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { username },
      {
        $push: {
          commissionUser: commissionUsername,
        },
      },
    );
  }
}
