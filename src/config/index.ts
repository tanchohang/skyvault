import dotenv from 'dotenv';
const env = dotenv.config();

if (env.error) {
  throw new Error('no env file found');
}

export default {
  port: parseInt(process.env.PORT, 10),
  env: process.env.NODE_ENV,
  base_url: process.env.BASE_URL,
};
