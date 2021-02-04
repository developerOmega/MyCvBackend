
import { Router } from 'express';
import ProjectSkillsController from '../Controllers/v1/ProjectSkillsController';

const router = Router();
const PROJECTSKILL = new ProjectSkillsController();

router.post('/project-skills', PROJECTSKILL.post);

router.delete('/project-skills/:project_id/:skill_id', PROJECTSKILL.delete);


export default router;