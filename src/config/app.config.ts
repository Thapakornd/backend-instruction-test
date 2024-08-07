import { cleanEnv, num, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  MONGODB_URI: str(),
  MONGODB_DATABASE: str(),

  APP_PORT: num(),
  APP_SESSION_SECRET: str(),
});
