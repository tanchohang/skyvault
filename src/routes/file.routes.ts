import { Router } from 'express';
import fs from 'fs';
import multer, { MulterError } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import projectController from '../controller/project.controller.js';
import uploadController from '../controller/upload.controller.js';
import { authenticatedUser } from '../middleware/auth.middleware.js';

const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.body.project === undefined) {
        cb(new Error('project field is undefined:multer/destination'), null);
      }

      if (req.body.path === undefined) {
        cb(new Error('path field is undefined:multer/destination'), null);
      }

      //checking if subfolder (inside project) is not undefined(path field is present)
      if (req.body.path != undefined && req.body.project !== undefined) {
        const folder = `uploads/${req.user_id}/${req.body.project}/${req.body.path}`; //folder where file will be uploaded
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
      }
    },
    filename: (req, file, cb) => {
      const filename = `${uuidv4()}-${file.originalname.split(' ').join('_')}`; //new filename = uuidv4()+original filename
      cb(null, filename);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 1 },
});

const publicUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      //checking if subfolder (inside project) is not undefined(path field is present)
      if (req.body.path != undefined) {
        const folder = `public/uploads/${req.body.project}/${req.body.path}`; //folder where file will be uploaded
        fs.mkdirSync(folder, { recursive: true });
        cb(null, folder);
      } else {
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

const multiFieldUpload = upload.fields([
  { name: 'primary', maxCount: 5 },
  { name: 'secondary', maxCount: 5 },
  { name: 'more', maxCount: 5 },
  { name: 'even_more', maxCount: 5 },
]);

router.get('/projects', authenticatedUser, projectController.getAllProject);

router.get(
  '/porjects/:id',
  authenticatedUser,
  projectController.getProjectFiles
);

router.post('/projects', authenticatedUser, projectController.createProject);

router.get('/file/:id', authenticatedUser, uploadController.serveFile);

// router.post(
//   '/upload',
//   [authenticatedUser, publicUpload.single('file')],
//   uploadController.uploadFile
// );

router.post(
  '/upload',
  [authenticatedUser, upload.single('file')],
  uploadController.uploadFile
);

router.post(
  '/uploads',
  [authenticatedUser, upload.array('files', 8)],
  uploadController.uploadFiles
);

router.post(
  '/multi-field-upload',
  [authenticatedUser, multiFieldUpload],
  uploadController.uploadMultiField
);

export default router;
