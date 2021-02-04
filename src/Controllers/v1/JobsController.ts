import {Request, Response} from 'express';
import Job from '../../Models/Job';


export default class JobController {

  public async index(req: Request, res: Response) {
    let init:any  = req.query.init;
    let end:any = req.query.end;

    try {

      let data = await Job.paginate(init, end);

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {

      return res.status(500).json({
        ok: false,
        err: {
          message: err.message
        }
      });
      
    }
  }

  public async show(req: Request, res: Response) {
    let id:any = req.params.id;

    try {
      let data = await Job.byId(id);

      if(!data){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El tabajo no existe"
          }
        });
      }

      return res.status(200).json({
        ok: true,
        data
      });

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      });    
    }
  }

  public async post(req: Request, res: Response) {
    let body = req.body;

    try {
  
      let data = await Job.create(body);
  
      return res.status(200).json({ ok: true, data });
  
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

  public async update(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let body = req.body;
  
    try {
  
      let job:any = await Job.byId(id);
  
      if(!job){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El tabajo no existe"
          } 
        })
      }
  
      let data = await job.update(body);
  
      return res.status(200).json({
        ok: true,
        data
      });
      
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
  }

  public async delete(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {
      
      let job:any = await Job.byId(id);

      if(!job){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El tabajo no existe  "
          }
        })
      }

      await job.delete();
  
      return res.status(200).json({
        ok: true,
        message: "El tabajo se ha eliminado con exito"
      })
  
    } catch (err) {
      return res.status(500).json({
        ok: false,
        err: {
          message: err.message
        }
      })
    }
  }
}