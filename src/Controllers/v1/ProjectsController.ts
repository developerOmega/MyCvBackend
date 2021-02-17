import {Request, Response} from 'express';
import Project from '../../Models/Project';
import ProjectSkill from '../../Models/ProjectSkill';


export default class ProjectController {

  public static async index(req: Request, res: Response) {
    let init:any  = req.query.init;
    let end:any = req.query.end;

    try {

      let data = await Project.paginate(init, end);

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

  public static async show(req: Request, res: Response) {
    let id:any = req.params.id;

    try {
      let data = await Project.byId(id);

      if(!data){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El proyecto no existe"
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

  public static async post(req: Request, res: Response) {
    let body = req.body;
    body.user_id = req.user.id;
    
    try {
  
      let data = await Project.create(body);
  
      return res.status(200).json({ ok: true, data });
  
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

  public static async update(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let body = req.body;
  
    try {
  
      let project:any = await Project.byId(id);
  
      if(!project){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El proyecto no existe"
          } 
        })
      }
  
      let data = await project.update(body);
  
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

  public static async delete(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {
      
      let project:any = await Project.byId(id);

      if(!project){
        return res.status(404).json({
          ok: false,
          err: {
            message: "El proyecto no existe  "
          }
        })
      }

      await project.delete();
  
      return res.status(200).json({
        ok: true,
        message: "El proyecto se ha eliminado con exito"
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

  public static async indexUser(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    
    try {
      let project = await Project.byId(id);
      let data = await project.user();

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
      })
    }
  }

  public static async indexSections(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {
      let project = await Project.byId(id);
      let data = await project.sections();

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

  public static async indexSkills(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);

    try {
      let project = await Project.byId(id);
      let data = await project.skills();

      return res.status(200).json({
        ok: true,
        data
      })

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }
}