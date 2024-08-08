import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { Public } from './decorator/public-route.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signUp')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  async signIn(): Promise<void> {}
}
