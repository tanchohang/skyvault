import { unlink } from 'fs';
export const unlinkFiles = (files) => {
    files.map((file) => unlink(process.cwd() + '/' + file.path, (err) => {
        if (err)
            throw err;
    }));
};
//# sourceMappingURL=unlinkFiles.js.map