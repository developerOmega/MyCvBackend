
import { Router } from 'express';
import SkillsController from '../Controllers/v1/SkillsController';

const router = Router();
const SKILL = new SkillsController();

router.get('/skills', SKILL.index);

router.get('/skills/:id', SKILL.show);

router.post('/skills', SKILL.post);

router.put('/skills/:id', SKILL.update);

router.delete('/skills/:id', SKILL.delete);

router.get('/skills/:id/admin', SKILL.indexAdmin);

router.get('/skills/:id/users', SKILL.indexUsers);

router.get('/skills/:id/projects', SKILL.indexProjects);

export default router;