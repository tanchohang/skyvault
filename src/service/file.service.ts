import { File, IFileDocument } from '../model/file.model.js';

export async function isFile(uid: string, pid: string): Promise<boolean> {
  const file = await File.find({ user: uid, _id: pid });
  if (file) {
    return true;
  }
  return false;
}

// export async function findeBYId(
//   uid: string,
//   pid: string
// ): Promise<IFileDocument> {
//   const file = await File.find({ user: uid, _id: pid }).select(-'password');

//   return file;
// }
