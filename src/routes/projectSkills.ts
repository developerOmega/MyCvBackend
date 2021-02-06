
import { Router } from 'express';
import ProjectSkillsController from '../Controllers/v1/ProjectSkillsController';
import { authUser } from '../Middlewares/authJwt';
import { authCreateSkillByUser, authProjectSkillByUser } from '../Middlewares/authProjectSkill';

const router = Router();
const PROJECTSKILL = new ProjectSkillsController();

router.post('/project-skills',  [authUser, authCreateSkillByUser], PROJECTSKILL.post);

router.delete('/project-skills/:project_id/:skill_id', [authUser, authProjectSkillByUser], PROJECTSKILL.delete);


export default router;