import {Request, Response} from 'express';
import ProjectSkill from '../../Models/ProjectSkill';


export default class ProjectSkillController {

  public async post(req: Request, res: Response) {
    let body = req.body;

    try {
  
      let data = await ProjectSkill.create(body);
  
      return res.status(200).json({ ok: true, data });
  
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

 
  public async delete(req: Request, res: Response) {
    let projectId:number = parseInt(req.params.project_id);
    let skillId:number = parseInt(req.params.skill_id);

    try {

      await ProjectSkill.deleteById( projectId, skillId );
  
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