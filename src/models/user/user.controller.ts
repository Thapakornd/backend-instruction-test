import { Controller, Get, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { PassportRequest } from 'src/auth/type/auth.interface';
import { ResponseUserDto } from './dto/res-user.dto';
import { plainToInstance } from 'class-transformer';
import { ResponseCodeDto } from './dto/res-code.dto';
import { ResponseLotDto } from './dto/res-lot.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  async getUserCode(@Req() req: PassportRequest): Promise<ResponseCodeDto> {
    return await this.userService.getCode(req.user);
  }

  @Get('me')
  getUserInfo(@Req() req: PassportRequest): ResponseUserDto {
    return plainToInstance(ResponseUserDto, req.user);
  }

  @Get('lot')
  async getUserLot(@Req() req: PassportRequest): Promise<ResponseLotDto> {
    return await this.userService.findLot(req.user);
  }
}
