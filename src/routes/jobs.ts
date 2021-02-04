
import { Router } from 'express';
import JobsController from '../Controllers/v1/JobsController';

const router = Router();
const JOB = new JobsController();

router.get('/jobs', JOB.index);

router.get('/jobs/:id', JOB.show);

router.post('/jobs', JOB.post);

router.put('/jobs/:id', JOB.update);

router.delete('/jobs/:id', JOB.delete);

router.get('/jobs/:id/user', JOB.indexUser);


export default router;