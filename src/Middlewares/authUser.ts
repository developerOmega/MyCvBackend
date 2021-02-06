import { Request, Response, NextFunction } from 'express';
import User from '../Models/User';

//  Middlwware que valida la relacion entre el usuario de la peticion y el usuario autenticado
const authUser = async (req: Request, res: Response, next: NextFunction) => {
  let userId:number = parseInt(req.params.id);

  try {
    // Buscar la peticion del usuario por el parametro id
    const user = await User.byId(userId);

    // Si el usuario de la peticion es diferente de el usuario autenticado, entondes se retornara un json con el error 403
    if(user.id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta accion :c"
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

export { authUser };