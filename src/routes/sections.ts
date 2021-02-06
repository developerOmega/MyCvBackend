
import { Router } from 'express';
import SectionsController from '../Controllers/v1/SectionsController';
import { authCreateSection, authSectionByUser } from '../Middlewares/authSection';
import { authUser } from '../Middlewares/authJwt';

const router = Router();
const SECTION = new SectionsController();

router.get('/sections', SECTION.index);

router.get('/sections/:id', SECTION.show);

router.post('/sections', [authUser, authCreateSection], SECTION.post);

router.put('/sections/:id', [authUser, authSectionByUser], SECTION.update);

router.delete('/sections/:id', [authUser, authSectionByUser], SECTION.delete);

router.get('/sections/:id/admin', SECTION.indexAdmin);

export default router;