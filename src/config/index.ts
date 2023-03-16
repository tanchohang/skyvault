import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const env = dotenv.config();

if (env.error) {
  throw new Error('no env file found');
}

export default {
  port: parseInt(process.env.PORT, 10),
};
