import multer from 'multer';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { isProject } from '../service/project.service.js';
/***
 * File upload reruirement:
    - All private uploaded files must be with a valid project_id folder.
    - user must be able to create subfolders directly through api call or manually through the UI
***/
export const uploadMulter = multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            const mainFolder = 'uploads';
            const user = req.user_id;
            const project = req.body.project;
            const filePublic = req.body.public === 'true'; //converting to boolean
            let subfolders = req.body.subfolders;
            if (req.body.project === undefined) {
                cb(Error('Project field is required'), null);
            }
            if (await isProject({ uid: user, pid: project })) {
                let uploadPath;
                filePublic ? (uploadPath = 'public/uploads') : (uploadPath = [mainFolder, user, project, subfolders].join('/'));
                fs.mkdirSync(uploadPath, { recursive: true });
                cb(null, uploadPath);
            }
            else {
                cb(new Error('Project is Invalid'), null);
            }
        },
        filename: (req, file, cb) => {
            const uniquePreuffix = Date.now() + '-' + uuidv4() + '-';
            //TODO:check if filename already exists
            cb(null, uniquePreuffix + file.originalname);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter(req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
            return cb(null, true);
        return cb(new Error('Only accepts image files:png,jpeg'));
    },
});
export const publicUploadMulter = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            //checking if subfolder (inside project) is not undefined(path field is present)
            if (req.body.path != undefined) {
                const folder = `public/uploads/${req.body.project}/${req.body.path}`; //folder where file will be uploaded
                fs.mkdirSync(folder, { recursive: true });
                cb(null, folder);
            }
            else {
                cb(new Error('path field is undefined:multer/destination'), null);
            }
        },
        filename: (req, file, cb) => {
            const filename = `${uuidv4()}-${file.originalname.split(' ').join('_')}`; //new filename = uuidv4()+original filename
            cb(null, filename);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 1 },
});
const multiMulter = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/' + file.fieldname);
        },
        filename: (req, file, cb) => {
            const uniquePreuffix = Date.now() + '-' + uuidv4();
            cb(null, uniquePreuffix + file.originalname);
        },
    }),
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter(req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png')
            return cb(null, true);
        return cb(new Error('Only accepts image files:png,jpeg'));
    },
});
export const multiFieldUpload = multiMulter.fields([
    { name: 'primary', maxCount: 5 },
    { name: 'secondary', maxCount: 5 },
    { name: 'more', maxCount: 5 },
    { name: 'even_more', maxCount: 5 },
]);
//# sourceMappingURL=multer.middleware.js.map