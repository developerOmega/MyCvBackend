
import { Router } from 'express';
import ProjectsController from '../Controllers/v1/ProjectsController';

const router = Router();
const PROJECT = new ProjectsController();

router.get('/projects', PROJECT.index);

router.get('/projects/:id', PROJECT.show);

router.post('/projects', PROJECT.post);

router.put('/projects/:id', PROJECT.update);

router.delete('/projects/:id', PROJECT.delete);

router.get('/projects/:id/user', PROJECT.indexUser);

router.get('/projects/:id/sections', PROJECT.indexSections);

router.get('/projects/:id/skills', PROJECT.indexSkills);

export default router;