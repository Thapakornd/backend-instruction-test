import { Request } from 'express';
import { ResponseUserDto } from 'src/models/user/dto/res-user.dto';

export interface PassportRequest extends Request {
  user: PassportUser;
}

interface PassportUser extends ResponseUserDto {}
