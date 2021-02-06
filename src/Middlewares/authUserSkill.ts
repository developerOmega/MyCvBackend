import { Request, Response, NextFunction } from 'express';

//  Middleware que valida la relacion del parametro user_id y el id del usuario autenticado
const authUserSkillByUser = async (req: Request, res: Response, next: NextFunction) => {
  let userId:number = parseInt(req.params.user_id);

  try {

    // Si el parametro user_id es diferente del id del usuario autenticado, entonces retorna un json con un error 403
    if(userId != req.user.id) {
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

//  Middleware que valida la relacion del parametro user_id de body y el id del usuario autenticado
const authCreateUserSkillByUser = async (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;

  try {

    // Si el parametro user_id del body es diferente del id del usuario autenticado, entonces retorna un json con un error 403
    if(body.user_id != req.user.id) {
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
export {authUserSkillByUser, authCreateUserSkillByUser};