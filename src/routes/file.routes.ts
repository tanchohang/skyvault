import { Router } from 'express';
import fileController from '../controller/file.controller.js';
import { authenticatedUser } from '../middleware/auth.middleware.js';
import { multiFieldUpload, uploadMulter } from '../middleware/multer.middleware.js';

const router = Router();

router.get('/files', authenticatedUser, fileController.readAllFiles);

// router.get('/files/:id/:filename', fileController.sendPublicFile);

router.get('/files/:filename', authenticatedUser, fileController.sendFile);

router.get('/files/project/:pid', authenticatedUser, fileController.readFiles);

router.get('/files/trash/:pid', authenticatedUser, fileController.readTrashedFiles);

router.post('/files', [authenticatedUser, uploadMulter.array('files', 20)], fileController.upload);

// router.post('/files/multi-field', [authenticatedUser, multiFieldUpload], fileController.uploadMultiplefield);

router.put('/files/:id', [authenticatedUser, uploadMulter.single('file')], fileController.update);

router.put('/files/trash/:id', authenticatedUser, fileController.restore);

router.delete('/files/trash', authenticatedUser, fileController.emptyTrash);

router.delete('/files/trash/:id', authenticatedUser, fileController.trash);

router.delete('/files/:id', authenticatedUser, fileController.destroy);

export default router;
