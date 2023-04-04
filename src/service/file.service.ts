import { File, IFile } from '../model/file.model.js';

export async function isFile(uid: string, pid: string): Promise<boolean> {
  const file = await File.find({ user: uid, _id: pid });
  if (file) {
    return true;
  }
  return false;
}
export async function getAllFiles({ uid }: { uid: string }): Promise<Array<IFile>> {
  const files = await File.find({ user: uid, archived: false });
  return files;
}
export async function getAllFileByProject({ uid, pid }: { uid: string; pid: string }): Promise<Array<IFile>> {
  const files = await File.find({ project: pid, user: uid, archived: false });
  return files;
}
export async function getunTrashed({ uid }: { uid: string }): Promise<Array<IFile>> {
  const files = await File.find({ user: uid, deleted: false });
  return files;
}

export async function getTrashed({ uid }: { uid: string }): Promise<Array<IFile>> {
  const files = await File.find({ user: uid, deleted: true });
  return files;
}

export async function saveFiles({ files }: { files: Array<IFile> }) {
  const uploadedFiles = await File.insertMany(files);
  return uploadedFiles;
}

export async function updateFile({ uid, id, name }: { uid: string; id: string; name: string }): Promise<any> {
  const file = await File.findOne({ user: uid, _id: id });
  const newPath = file.path.split('-').slice(0, -1).concat(name).join('-');
  const newfileName = file.fileName.split('-').slice(0, -1).concat(name).join('-');
  file.originalName = name;
  file.fileName = newfileName;
  file.path = newPath;
  file.save();
  return file;
}

export async function trashFile({ id }: { id: string }): Promise<any> {
  const file = await File.findOne({ _id: id });
  file.deleted = true;
  file.save();
  return file;
}
export async function restoreFile({ id }: { id: string }): Promise<any> {
  const file = await File.findOne({ _id: id });
  file.deleted = false;
  file.save();
  return file;
}

export async function deleteFile({ uid, id }: { uid: string; id: string }): Promise<any> {
  const deleted = await File.deleteOne({ user: uid, _id: id });
  return deleted;
}

export async function emptyTrash({ uid }: { uid: string }): Promise<any> {
  // const deleted = await File.deleteMany({ user: uid, deleted: true });

  const deleted = await File.updateMany({ user: uid, deleted: true }, { archived: true });
  return deleted;
}
