
import { Router } from 'express';
import UsersController from '../Controllers/v1/UsersController';

const router = Router();
const USER = new UsersController();

router.get('/users', USER.index);

router.get('/users/:id', USER.show);

router.post('/users', USER.post);

router.put('/users/:id', USER.update);

router.delete('/users/:id', USER.delete);

router.get('/users/:id/skills', USER.indexSkills);

router.get('/users/:id/jobs', USER.indexJobs);

router.get('/users/:id/projects', USER.indexProjects);

router.put('/users/:id/password', USER.updatePassword);

export default router;