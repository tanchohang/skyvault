import { Router } from 'express';
import { signup, login, logout } from '../controller/auth.controller.js';
import { authenticatedUser } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.delete('/logout', authenticatedUser, logout);

export default router;
