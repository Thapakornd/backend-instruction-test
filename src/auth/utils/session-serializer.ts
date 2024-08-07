import {Injectable} from '@nestjs/common';
import {PassportSerializer} from '@nestjs/passport';
import {UserService} from 'src/models/user/user.service';
import {User} from 'src/schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('deserializer');
    const userDb = await this.userService.findOneByUsername(user.username);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
