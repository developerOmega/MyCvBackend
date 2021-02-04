import {Request, Response} from 'express';
import Section from '../../Models/Section';


export default class SectionController {

  public async index(req: Request, res: Response) {
    let init:any  = req.query.init;
    let end:any = req.query.end;

    try {

      let data = await Section.paginate(init, end);

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
      let data = await Section.byId(id);

      if(!data){
        return res.status(404).json({
          ok: false,
          err: {
            message: "La seccion no existe"
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
  
      let data = await Section.create(body);
  
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
  
      let section:any = await Section.byId(id);
  
      if(!section){
        return res.status(404).json({
          ok: false,
          err: {
            message: "La seccion no existe"
          } 
        })
      }
  
      let data = await section.update(body);
  
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
      
      let section:any = await Section.byId(id);

      if(!section){
        return res.status(404).json({
          ok: false,
          err: {
            message: "La seccion no existe  "
          }
        })
      }

      await section.delete();
  
      return res.status(200).json({
        ok: true,
        message: "La seccion se ha eliminado con exito"
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

  public async indexAdmin(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {
      let section = await Section.byId(id);
      let data = await section.admin();

      return res.status(200).json({
        ok: true,
        data
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