
import { Router } from 'express';
import AdminsController from '../Controllers/v1/AdminsController';

const router = Router();
const ADMIN = new AdminsController();

router.get('/admins', ADMIN.index);

router.get('/admins/:id', ADMIN.show);

router.post('/admins', ADMIN.post);

router.put('/admins/:id', ADMIN.update);

router.delete('/admins/:id', ADMIN.delete)

export default router;