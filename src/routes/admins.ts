import { Router } from 'express';
import AdminsController from '../Controllers/v1/AdminsController';
import { authAdmin } from '../Middlewares/authJwt';

const router = Router();
const ADMIN = new AdminsController();

router.get('/admins', ADMIN.index);

router.get('/admins/:id', ADMIN.show);

router.post('/admins', authAdmin, ADMIN.post);

router.put('/admins/:id', authAdmin, ADMIN.update);

router.delete('/admins/:id', authAdmin, ADMIN.delete);

router.get('/admins/:id/skills', ADMIN.indexSkills);

router.put('/admins/:id/password', authAdmin, ADMIN.updatePassword);

export default router;