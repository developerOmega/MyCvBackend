
import { Router } from 'express';
import { AdminAuthController, UserAuthController } from '../Controllers/v1/AuthController';

const router = Router();
const USER = new UserAuthController();
const ADMIN = new AdminAuthController();

router.post('/login/user', USER.login);
router.post('/login/admin', ADMIN.login);


export default router;