import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

    async createUser(createUserDto: CreateUserDto) {
        
    }
}
