import { unlink } from 'fs';

export const unlinkFiles = (files: Array<Express.Multer.File>) => {
  files.map((file) =>
    unlink(process.cwd() + '/' + file.path, (err) => {
      if (err) throw err;
    })
  );
};
