import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { env } from './config/app.config';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    }),
  );

  app.use(
    session({
      secret: env.APP_SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true,
      },
    }),
  );

  await app.listen(env.APP_PORT);
}
bootstrap();
