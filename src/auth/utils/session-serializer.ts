import {PassportSerializer} from '@nestjs/passport';
import {UserService} from 'src/models/user/user.service';
import {User} from 'src/schemas/user.schema';

export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: (err, user: User) => void) {
    console.log('serializer')
    done(null, user);
  }

  async deserializeUser(user: User, done: (err, user: User) => void) {
    console.log('deserializer')
    const userDb = await this.userService.findOne(user.username);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
