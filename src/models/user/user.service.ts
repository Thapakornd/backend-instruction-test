import {Injectable} from '@nestjs/common';
import {UserRepository} from './user.repository';
import {User} from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create() {
    return null;
  }

  async findOne(username?: string, email?: string): Promise<User | null> {
    if (username) return this.userRepository.findOneByUsername(username);
    else if (email) return this.userRepository.findOneByUsername(email);
    throw new Error("username or email should not empty.");
  }
}
