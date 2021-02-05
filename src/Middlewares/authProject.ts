import { Request, Response, NextFunction } from 'express';
import Project from '../Models/Project';

const authProjectByUser = async (req: Request, res: Response, next: NextFunction) => {
  let projectId:number = parseInt(req.params.id);

  try {
    const project = await Project.byId(projectId);

    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
        }
      });
    }

    next();

  } catch (err) {

    return res.status(500).json({
      ok: false,
      err: {
        name: err.name,
        message: err.message
      }
    })
  }

}

export {authProjectByUser};