import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  mode: process.env.APP_MODE || 'development',
  host: process.env.APP_HOST || 'localhost',
  port: process.env.APP_PORT || 3000,
  protocol: process.env.APP_PROTOCOL || 'https',
}));
