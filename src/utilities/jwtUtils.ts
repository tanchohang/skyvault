import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function createToken(id: any): string {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
}

export function verifyToken(token: string): string {
  return jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: any, user: any) => {
      if (err) throw new Error(err.message + ':jwrUtils/verifyToken()');
      return user.id;
    }
  );
}
