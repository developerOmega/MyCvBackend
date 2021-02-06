
import { Router } from 'express';
import UsersController from '../Controllers/v1/UsersController';
import { authUser, authAdmin } from '../Middlewares/authJwt';
import { authUser as authUserBySession } from '../Middlewares/authUser';  

const router = Router();
const USER = new UsersController();

router.get('/users', USER.index);

router.get('/users/:id', USER.show);

router.post('/users', authAdmin, USER.post);

router.put('/users/:id', [authUser, authUserBySession], USER.update);

router.delete('/users/:id', authAdmin, USER.delete);

router.get('/users/:id/skills', USER.indexSkills);

router.get('/users/:id/jobs', USER.indexJobs);

router.get('/users/:id/projects', USER.indexProjects);

router.put('/users/:id/password', [authUser, authUserBySession], USER.updatePassword);  

export default router;