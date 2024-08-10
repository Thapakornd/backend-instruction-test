import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/models/user/dto/create-user.dto';
import { Public } from './decorator/public-route.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { PassportRequest } from './type/auth.interface';
import { Response } from 'express';

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

  @Get('/signOut')
  async signOut(@Req() req: PassportRequest): Promise<void> {
    req.logOut(null, (err: Error) => {
      if (err) throw new ConflictException(`Error: ${err.toString()}`)
    })
  }
}
