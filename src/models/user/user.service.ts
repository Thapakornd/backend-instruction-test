import { Body, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { createHash } from 'crypto';
import { ResponseUserDto } from './dto/res-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.create(createUserDto);
  }

  async findOneByUsernameOrEmail(
    usernameOrEmail: string,
  ): Promise<User> {
    if (usernameOrEmail)
      return this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);
    throw new Error('username or email should not empty.');
  }

  async findOneByUsername(username: string): Promise<ResponseUserDto> {
    return await this.userRepository.findOneByUsername(username);
  }

  async findOneByEmail(email: string): Promise<ResponseUserDto> {
    return await this.userRepository.findOneByEmail(email);
  }

  async getCode(user: ResponseUserDto) {
    const userCode = this.generateCode(user.firstName, user.lastName);
  }

  private generateCode(firstname: string, lastname: string): string {
    const timestamp = Date.now();
    const data = `${firstname}-${lastname}-${timestamp}`;
    return createHash('sha-256').update(data).digest('hex');
  }
}
