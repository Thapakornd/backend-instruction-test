import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import {
  ResponseUserDto,
  CreateUserDto,
  ResponseCodeDto,
  ResponseLotDto,
  ResponseCommissionMoneyDto,
} from './dto';
import { UserWithParentEntity } from './entity/user-with-parents.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByUsernameOrEmail(username: string): Promise<ResponseUserDto> {
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
      {
        username: true,
        firstName: true,
        lastName: true,
        password: true,
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

  async findCodeById(id: string): Promise<ResponseCodeDto> {
    return await this.userModel.findById(id, { _id: false, code: true });
  }

  async findOneByCode(code: string): Promise<{ _id: string }> {
    return await this.userModel.findOne({ code });
  }

  async insertCode(id: string, code: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, { code });
  }

  async findLotById(id: string): Promise<ResponseLotDto> {
    return await this.userModel.findById(id, { _id: false, lot: true });
  }

  async findOneById(id: string): Promise<ResponseUserDto> {
    return await this.userModel.findById(id, {
      username: true,
      firstName: true,
      lastName: true,
    });
  }

  async findUserParentsById(id: string): Promise<UserWithParentEntity[]> {
    return await this.userModel.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $graphLookup: {
          from: 'users',
          startWith: '$registerCodeId',
          connectFromField: 'registerCodeId',
          connectToField: '_id',
          depthField: 'level',
          maxDepth: 3,
          as: 'parents',
        },
      },
    ]);
  }

  async updateCommissionMoney(
    id: string,
    commissionMoney: number,
  ): Promise<void> {
    await this.userModel.findByIdAndUpdate(id, {
      $inc: {
        commissionMoney,
      },
    });
  }

  async findCommissionMoneyById(
    id: string,
  ): Promise<ResponseCommissionMoneyDto> {
    return await this.userModel.findById(id, {
      _id: false,
      commissionMoney: true,
    });
  }
}
