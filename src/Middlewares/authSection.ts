import { Request, Response, NextFunction } from 'express';
import Section from '../Models/Section';
import Project from '../Models/Project';

const authSectionByUser = async (req: Request, res: Response, next: NextFunction) => {
  let SectionId:number = parseInt(req.params.id);

  try {
    const section = await Section.byId(SectionId);
    const project = await Project.byId(section.project_id); 

    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta seccion"
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

export {authSectionByUser};