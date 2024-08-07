import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from 'src/models/user/user.module';
import {PassportModule} from '@nestjs/passport';
import {SessionSerializer} from './utils/session-serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      session: true,
    }),
    SessionSerializer,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
