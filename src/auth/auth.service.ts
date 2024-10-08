import { Injectable } from '@nestjs/common';
import { UserService } from 'src/models/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, ResponseUserDto } from 'src/models/user/dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    await this.userService.create(createUserDto);
  }

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<ResponseUserDto> {
    const user =
      await this.userService.findOneByUsernameOrEmail(usernameOrEmail);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return user;
  }
}
