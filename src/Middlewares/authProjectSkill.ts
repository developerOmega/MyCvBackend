import { Request, Response, NextFunction } from 'express';
import Project from '../Models/Project';

//  Middleware que valida la relacion del parametro user_id del proyecto y el id del usuario autenticado
const authProjectSkillByUser = async (req: Request, res: Response, next: NextFunction) => {
  let projectId:number = parseInt(req.params.project_id);

  try {
    // Buscar proyecto por el parametro id
    const project = await Project.byId(projectId);

    // Si el parametro user_id del proyecto es diferente del id del usuario autenticado, entonces retorna un json con un error 403
    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta accion"
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

//  Middleware para validar la existencia de projects en users
const authCreateSkillByUser = async (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;

  try {
    // Buscar proyecto por el parametro id del body
    const project = await Project.byId(body.project_id);
    
    // Si el parametro user_id del proyecto es diferente del id del usuario autenticado, entonces retorna un json con un error 403
    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta accion"
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
export {authProjectSkillByUser, authCreateSkillByUser};