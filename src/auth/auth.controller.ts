import {Body, Controller, Get, Post, Req, Session, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from 'src/models/user/dto/create-user.dto';
import { Public } from './decorator/public-route.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto)
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  async signIn(@Req() req) {
    return req.user;
  }

  @Get('/status')
  async getStatus(@Req() req) {
    console.log(req.user);
    return req.user;
  }

  @Public()
  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    return session;
  }
}
