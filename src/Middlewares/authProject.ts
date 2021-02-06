import { Request, Response, NextFunction } from 'express';
import Project from '../Models/Project';

//  Middleware para validar la existencia de projects en users
const authProjectByUser = async (req: Request, res: Response, next: NextFunction) => {
  let projectId:number = parseInt(req.params.id);

  try {
    // Buscar projects por el parmaetro id
    const project = await Project.byId(projectId);

    // Si el parametro user_id de project es diferente del parametro user.id de request, entonces retorna un json con un error 403
    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
        }
      });
    }

    // Validar existencia
    next();

  } catch (err) {
    // Si hay error en try, retornar json con error 500
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