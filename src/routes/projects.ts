
import { Router } from 'express';
import ProjectsController from '../Controllers/v1/ProjectsController';
import { authProjectByUser } from '../Middlewares/authProject';
import { authUser } from '../Middlewares/authJwt';

const router = Router();
const PROJECT = new ProjectsController();

router.get('/projects', PROJECT.index);

router.get('/projects/:id', PROJECT.show);

router.post('/projects', authUser, PROJECT.post);

router.put('/projects/:id', [authUser, authProjectByUser], PROJECT.update);

router.delete('/projects/:id', [authUser, authProjectByUser], PROJECT.delete);

router.get('/projects/:id/user', PROJECT.indexUser);

router.get('/projects/:id/sections', PROJECT.indexSections);

router.get('/projects/:id/skills', PROJECT.indexSkills);

export default router;