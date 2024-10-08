import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { env } from './config/app.config';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());

  app.use(
    session({
      secret: env.APP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 640000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(env.APP_PORT);
}
bootstrap();
