import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import {
  createProject,
  getAllProject,
  getProjectFiles,
} from '../controller/project.controller.js';
import uploadController from '../controller/upload.controller.js';
import { authenticatedUser } from '../middleware/auth.middleware.js';

const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const folder = `uploads/${req.body.project}/`;
      fs.mkdirSync(folder, { recursive: true });
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}-${file.originalname.split(' ').join('_')}`);
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

router.get('/projects', authenticatedUser, getAllProject);

router.get('/porjects/:id', authenticatedUser, getProjectFiles);

router.post('/projects', authenticatedUser, createProject);

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
