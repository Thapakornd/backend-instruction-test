import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './models/user/user.module';
import {AuthModule} from './auth/auth.module';
import {MongooseModule} from '@nestjs/mongoose';
import {env} from './config/app.config';
import {APP_GUARD} from '@nestjs/core';
import {AuthenticatedGuard} from './auth/guard/authenticated.guard';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './auth/utils/session-serializer';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PassportModule.register({
      session: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: env.MONGODB_URI,
        dbName: env.MONGODB_DATABASE,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard,
    },
    SessionSerializer,
  ],
})
export class AppModule {}
