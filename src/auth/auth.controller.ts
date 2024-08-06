import {Controller} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from 'src/models/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(createUserDto: CreateUserDto): Promise<{msg: string}> {
    return {
      msg: 'successful',
    };
  }

  async signIn() {}
}
