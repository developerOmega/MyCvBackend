
import { Router } from 'express';
import JobsController from '../Controllers/v1/JobsController';
import { authJobByUser } from '../Middlewares/authJob';
import { authUser } from '../Middlewares/authJwt';
 
const router = Router();
const JOB = new JobsController();

router.get('/jobs', JOB.index);

router.get('/jobs/:id', JOB.show);

router.post('/jobs', authUser, JOB.post);

router.put('/jobs/:id', [authUser, authJobByUser], JOB.update);

router.delete('/jobs/:id', [authUser, authJobByUser], JOB.delete);

router.get('/jobs/:id/user', JOB.indexUser);


export default router;