
import { Router, Request, Response } from 'express';
import ProjectsController from '../Controllers/v1/ProjectsController';
import ProjectFilesController from '../Controllers/v1/ProjectFilesController';
import { authProjectByUser } from '../Middlewares/authProject';
import { authUser } from '../Middlewares/authJwt';
import { validateFiles } from '../Middlewares/validateFiles';


const router = Router();
const PROJECT = new ProjectsController();
const PROJECT_FILE = new ProjectFilesController();

router.get('/projects', PROJECT.index);

router.get('/projects/:id', PROJECT.show);

router.post('/projects', authUser, PROJECT.post);

router.put('/projects/:id', [authUser, authProjectByUser], PROJECT.update);

router.delete('/projects/:id', [authUser, authProjectByUser], PROJECT.delete);

router.get('/projects/:id/user', PROJECT.indexUser);

router.get('/projects/:id/sections', PROJECT.indexSections);

router.get('/projects/:id/skills', PROJECT.indexSkills);

router.get('/qwerty', (req: Request, res: Response) => {
  return res.status(200).json({
    ok: true,
    message: "El error no son las rutas"
  });
});


router.post('/projects/:id/img', [authUser, authProjectByUser, validateFiles], (req: Request, res: Response) => PROJECT_FILE.post(req, res));

router.put('/projects/:id/img', [authUser, authProjectByUser, validateFiles], (req: Request, res: Response) => PROJECT_FILE.update(req, res));

router.delete('/projects/:id/img', [authUser, authProjectByUser], (req: Request, res: Response) => PROJECT_FILE.delete(req, res));



export default router;