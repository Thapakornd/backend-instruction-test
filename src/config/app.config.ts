import { cleanEnv, num, str } from 'envalid';
import 'dotenv/config';

export const env = cleanEnv(process.env, {
  MONGODB_URI: str(),

  APP_PORT: num(),
  APP_SESSION_SECRET: str(),
});
