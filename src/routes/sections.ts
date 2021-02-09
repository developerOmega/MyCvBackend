
import { Router, Request, Response } from 'express';
import SectionsController from '../Controllers/v1/SectionsController';
import SectionFilesController from '../Controllers/v1/SectionFilesController';
import { authCreateSection, authSectionByUser } from '../Middlewares/authSection';
import { authUser } from '../Middlewares/authJwt';
import { validateFiles } from '../Middlewares/validateFiles';

const router = Router();
const SECTION = new SectionsController();
const SECTION_FILE = new SectionFilesController();

router.get('/sections', SECTION.index);

router.get('/sections/:id', SECTION.show);

router.post('/sections', [authUser, authCreateSection], SECTION.post);

router.put('/sections/:id', [authUser, authSectionByUser], SECTION.update);

router.delete('/sections/:id', [authUser, authSectionByUser], SECTION.delete);

router.get('/sections/:id/admin', SECTION.indexAdmin);


router.post('/sections/:id/img', [authUser, authSectionByUser, validateFiles], (req: Request, res: Response) => SECTION_FILE.post(req, res));

router.put('/sections/:id/img', [authUser, authSectionByUser, validateFiles], (req: Request, res: Response) => SECTION_FILE.update(req, res));

router.delete('/sections/:id/img', [authUser, authSectionByUser], (req: Request, res: Response) => SECTION_FILE.delete(req, res));


export default router;