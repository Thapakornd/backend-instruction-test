import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from 'src/models/user/dto/create-user.dto';
import { Public } from './decorator/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto)
  }

  @Post('/signIn')
  async signIn() {}
}
