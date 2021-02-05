import { Request, Response, NextFunction } from 'express';
import Job from '../Models/Job';

const authJobByUser = async (req: Request, res: Response, next: NextFunction) => {
  let jobId:number = parseInt(req.params.id);

  try {
    const job = await Job.byId(jobId);

    if(job.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este trabajo"
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

export {authJobByUser};