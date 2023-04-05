import dotenv from 'dotenv';
const env = dotenv.config();

export const config = {
  port: parseInt(process.env.PORT, 10),
  env: process.env.NODE_ENV,
  base_url: process.env.BASE_URL,
};
