
import { Router } from 'express';
import SectionsController from '../Controllers/v1/SectionsController';

const router = Router();
const SECTION = new SectionsController();

router.get('/sections', SECTION.index);

router.get('/sections/:id', SECTION.show);

router.post('/sections', SECTION.post);

router.put('/sections/:id', SECTION.update);

router.delete('/sections/:id', SECTION.delete);

router.get('/sections/:id/admin', SECTION.indexAdmin);

export default router;