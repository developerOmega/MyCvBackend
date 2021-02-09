
import { Router, Request, Response } from 'express';
import SectionsController from '../Controllers/v1/SectionsController';
import SectionFilesController from '../Controllers/v1/SectionFilesController';
import { authCreateSection, authSectionByUser } from '../Middlewares/authSection';
import { authUser } from '../Middlewares/authJwt';

const router = Router();
const SECTION = new SectionsController();
const SECTION_FILE = new SectionFilesController();

router.get('/sections', SECTION.index);

router.get('/sections/:id', SECTION.show);

router.post('/sections', [authUser, authCreateSection], SECTION.post);

router.put('/sections/:id', [authUser, authSectionByUser], SECTION.update);

router.delete('/sections/:id', [authUser, authSectionByUser], SECTION.delete);

router.get('/sections/:id/admin', SECTION.indexAdmin);


router.post('/section/:id/img', (req: Request, res: Response) => SECTION_FILE.post(req, res));

router.delete('/section/:id/img', (req: Request, res: Response) => SECTION_FILE.delete(req, res));

router.put('/section/:id/img', (req: Request, res: Response) => SECTION_FILE.update(req, res));

export default router;