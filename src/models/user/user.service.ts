import {Body, Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {User} from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.userRepository.create(createUserDto);
  }

  async findOne(username?: string, email?: string): Promise<User | null> {
    if (username) return this.userRepository.findOneByUsername(username);
    else if (email) return this.userRepository.findOneByUsername(email);
    throw new Error("username or email should not empty.");
  }
}
