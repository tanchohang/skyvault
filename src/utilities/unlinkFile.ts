import { unlink } from 'fs';

export const unlinkFile = (path: string) => {
  unlink(process.cwd() + '/' + path, (err) => {
    if (err) throw err;
  });
};
