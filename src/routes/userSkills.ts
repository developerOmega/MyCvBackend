
import { Router } from 'express';
import UserSkillsController from '../Controllers/v1/UserSkillsController';

const router = Router();
const USERSKILL = new UserSkillsController();

router.post('/user-skills', USERSKILL.post);

router.delete('/user-skills/:user_id/:skill_id', USERSKILL.delete);


export default router;