import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  mode: process.env.APP_MODE || 'development',
  host: process.env.APP_HOST || 'localhost',
  portB: process.env.APP_PORT_BACK || 3000,
  portF: process.env.APP_PORT_FRONT || 5173,
  protocol: process.env.APP_PROTOCOL || 'https',
}));
