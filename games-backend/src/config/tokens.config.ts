import { registerAs } from '@nestjs/config';

export default registerAs('tokens', () => ({
  steam: process.env.API_TOKEN_STEAM,
}));
