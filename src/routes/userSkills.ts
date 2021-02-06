
import { Router } from 'express';
import UserSkillsController from '../Controllers/v1/UserSkillsController';
import { authUser } from '../Middlewares/authJwt';
import { authUserSkillByUser, authCreateUserSkillByUser } from '../Middlewares/authUserSkill';

const router = Router();
const USERSKILL = new UserSkillsController();

router.post('/user-skills', [authUser, authCreateUserSkillByUser], USERSKILL.post);

router.delete('/user-skills/:user_id/:skill_id', [authUser, authUserSkillByUser], USERSKILL.delete);


export default router;