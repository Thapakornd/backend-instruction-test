import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportRequest } from 'src/auth/type/auth.interface';
import { ResponseUserDto } from './dto/res-user.dto';
import { plainToInstance } from 'class-transformer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  getUserCode(@Req() req: PassportRequest) {
    return this.userService.getCode(req.user);
  }

  @Get('me')
  getUserInfo(@Req() req: PassportRequest): ResponseUserDto {
    return plainToInstance(ResponseUserDto, req.user);
  }
}
