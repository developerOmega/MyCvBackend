import { Router, Request, Response } from 'express';
import UsersController from '../Controllers/v1/UsersController';
import {UserImgFilesController, UserMainImgFilesController} from '../Controllers/v1/UserFilesController';
import { authUser, authAdmin } from '../Middlewares/authJwt';
import { authUser as authUserBySession } from '../Middlewares/authUser';  
import { validateFiles } from '../Middlewares/validateFiles';


const router = Router();
const USER = new UsersController();
const USER_IMG_FILE = new UserImgFilesController();
const USER_MIMG_FILE = new UserMainImgFilesController();

router.get('/users', USER.index);

router.get('/users/:id', USER.show);

router.post('/users', authAdmin, USER.post);

router.put('/users/:id', [authUser, authUserBySession], USER.update);

router.delete('/users/:id', authAdmin, USER.delete);

router.get('/users/:id/skills', USER.indexSkills);

router.get('/users/:id/jobs', USER.indexJobs);

router.get('/users/:id/projects', USER.indexProjects);

router.put('/users/:id/password', [authUser, authUserBySession], USER.updatePassword);  


router.post('/users/:id/img', [authUser, authUserBySession, validateFiles], (req: Request, res: Response) => USER_IMG_FILE.post(req, res));

router.put('/users/:id/img', [authUser, authUserBySession, validateFiles], (req: Request, res: Response) => USER_IMG_FILE.update(req, res));

router.delete('/users/:id/img', [authUser, authUserBySession], (req: Request, res: Response) => USER_IMG_FILE.delete(req, res));


router.post('/users/:id/main_img', [authUser, authUserBySession, validateFiles], (req: Request, res: Response) => USER_MIMG_FILE.post(req, res));

router.put('/users/:id/main_img', [authUser, authUserBySession, validateFiles], (req: Request, res: Response) => USER_MIMG_FILE.update(req, res));

router.delete('/users/:id/main_img', [authUser, authUserBySession], (req: Request, res: Response) => USER_MIMG_FILE.delete(req, res));


export default router;