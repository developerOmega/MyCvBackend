
import { Router } from 'express';
import UsersController from '../Controllers/v1/UsersController';

const router = Router();
const USER = new UsersController();

router.get('/users', USER.index);

router.get('/users/:id', USER.show);

router.post('/users', USER.post);

router.put('/users/:id', USER.update);

router.delete('/users/:id', USER.delete)

export default router;