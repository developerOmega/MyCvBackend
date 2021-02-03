import {Request, Response} from 'express';
import User from '../../Models/User';


export default class UserController {

  public async index(req: Request, res: Response) {
    let init:any  = req.query.init;
    let end:any = req.query.end;

    try {

      let data = await User.paginate(init, end);

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
      let data = await User.byId(id);

      if(!data){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El usuario no existe"
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
  
      let data = await User.create(body);
  
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
  
      let user:any = await User.byId(id);
  
      if(!user){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El usuario no existe"
          } 
        })
      }
  
      let data = await user.update(body);
  
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
      
      let user:any = await User.byId(id);

      if(!user){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El usuario no existe  "
          }
        })
      }

      await user.delete();
  
      return res.status(200).json({
        ok: true,
        message: "El usuario se ha eliminado con exito"
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