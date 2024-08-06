import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

    async createUser(createUserDto: CreateUserDto) {
        
    }

    async validateUser(password: string, username?: string, email?: string): Promise<void> {
        const user = await this.userService.findOne(username, email);
    }
}
