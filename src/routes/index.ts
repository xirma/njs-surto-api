import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

//Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.signUp);
router.get('/api/auth/profile', AuthController.profile);

//Users

//Admin

export default router;