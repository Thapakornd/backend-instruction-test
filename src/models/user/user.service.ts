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

  async findOneByUsernameOrEmail(usernameOrEmail: string): Promise<User | null> {
    if(usernameOrEmail) return this.userRepository.findOneByUsernameOrEmail(usernameOrEmail);
    throw new Error("username or email should not empty.");
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOneByUsername(username);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneByEmail(email);
  }
}
