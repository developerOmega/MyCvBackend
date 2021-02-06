import { Request, Response, NextFunction } from 'express';
import Job from '../Models/Job';

// Middleware para validar la existencia de jobs en los users
const authJobByUser = async (req: Request, res: Response, next: NextFunction) => { 
  let jobId:number = parseInt(req.params.id);

  try {
    //  Buscar los trabajos por el parametro id
    const job = await Job.byId(jobId);

    // Si el user_id de job es diferente del id de user, entonces retornara un json con error 404
    if(job.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este trabajo"
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

export {authJobByUser};