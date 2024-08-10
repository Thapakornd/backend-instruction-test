import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { ResponseUserDto } from 'src/models/user/dto';
import { UserService } from 'src/models/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: ResponseUserDto, done: (err, id: string) => void) {
    done(null, user._id);
  }

  async deserializeUser(
    id: string,
    done: (err, user: ResponseUserDto) => void,
  ) {
    const userDb = await this.userService.findOneById(id);
    return userDb
      ? done(null, {
          _id: userDb._id.toString(),
          username: userDb.username,
          firstName: userDb.firstName,
          lastName: userDb.lastName,
        } as ResponseUserDto)
      : done(null, null);
  }
}
