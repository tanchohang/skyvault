import projectController from '../controller/project.controller.js';
import { Router } from 'express';
import { authenticatedUser } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/projects', authenticatedUser, projectController.getAllProject);
router.get('/projects/:name', authenticatedUser, projectController.getProjectByName);
router.post('/projects', authenticatedUser, projectController.createProject);
router.put('/projects/:id', authenticatedUser, projectController.updateProject);
router.delete('/projects/:id', authenticatedUser, projectController.deleteProject);
export default router;
//# sourceMappingURL=project.routes.js.map