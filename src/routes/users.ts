import { Router, Request, Response } from 'express';
import UsersController from '../Controllers/v1/UsersController';
import UserFilesController from '../Controllers/v1/UserFilesController';
import { authUser, authAdmin } from '../Middlewares/authJwt';
import { authUser as authUserBySession } from '../Middlewares/authUser';  


const router = Router();
const USER = new UsersController();
const USER_FILE = new UserFilesController();

router.get('/users', USER.index);

router.get('/users/:id', USER.show);

router.post('/users', authAdmin, USER.post);

router.put('/users/:id', [authUser, authUserBySession], USER.update);

router.delete('/users/:id', authAdmin, USER.delete);

router.get('/users/:id/skills', USER.indexSkills);

router.get('/users/:id/jobs', USER.indexJobs);

router.get('/users/:id/projects', USER.indexProjects);

router.put('/users/:id/password', [authUser, authUserBySession], USER.updatePassword);  

router.post('/users/:id/img', (req: Request, res: Response) => USER_FILE.post(req, res));

router.delete('/users/:id/img', (req: Request, res: Response) => USER_FILE.delete(req, res));

router.put('/users/:id/img', (req: Request, res: Response) => USER_FILE.update(req, res));

export default router;