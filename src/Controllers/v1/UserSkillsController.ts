import {Request, Response} from 'express';
import UserSkill from '../../Models/UserSkill';


export default class UserSkillController {

  public async post(req: Request, res: Response) {
    let body = req.body;

    try {
  
      let data = await UserSkill.create(body);
  
      return res.status(200).json({ ok: true, data });
  
    } catch (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
  }

 
  public async delete(req: Request, res: Response) {
    let userId:number = parseInt(req.params.user_id);
    let skillId:number = parseInt(req.params.skill_id);

    try {

      await UserSkill.deleteById( userId, skillId );
  
      return res.status(200).json({
        ok: true,
        message: "La relacion user-skill ha eliminado con exito"
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