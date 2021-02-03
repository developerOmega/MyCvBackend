import {Request, Response} from 'express';
import Admin from '../../Models/Admin';


export default class AdminsController {

  public async index(req: Request, res: Response) {
    let init:any  = req.query.init;
    let end:any = req.query.end;

    try {

      let data = await Admin.paginate(init, end);

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
      let data = await Admin.byId(id);

      if(!data){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El Administrador no existe"
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
  
      let data = await Admin.create(body);
  
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
  
      let admin:any = await Admin.byId(id);
  
      if(!admin){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El Administrador no existe"
          } 
        })
      }
  
      let data = await admin.update(body);
  
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
      
      let admin:any = await Admin.byId(id);

      if(!admin){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El Administrador no existe  "
          }
        })
      }

      await admin.delete();
  
      return res.status(200).json({
        ok: true,
        message: "El administrador se ha eliminado con exito"
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