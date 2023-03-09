import { registerAs } from '@nestjs/config';

export default registerAs('secrets', () => ({
  session: process.env.SECRET_SESSION,
}));
