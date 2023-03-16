import { User } from '../model/user.model.js';

export async function isUser(uid: string, pid: string): Promise<boolean> {
  const user = await User.find({ user: uid, _id: pid }).select(-'password');
  if (user) {
    return true;
  }
  return false;
}
