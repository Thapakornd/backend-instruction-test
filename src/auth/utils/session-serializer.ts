import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ResponseUserDto } from 'src/models/user/dto/res-user.dto';
import { UserService } from 'src/models/user/user.service';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err, username: string) => void) {
    done(null, user.username);
  }

  async deserializeUser(username: string, done: (err, user: ResponseUserDto) => void) {
    const userDb = await this.userService.findOneByUsername(username);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
