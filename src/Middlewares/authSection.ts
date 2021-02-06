import { Request, Response, NextFunction } from 'express';
import Section from '../Models/Section';
import Project from '../Models/Project';

// Middleware que valida la existencia de las section en los users por medio de la tabla projects
const authSectionByUser = async (req: Request, res: Response, next: NextFunction) => {
  let SectionId:number = parseInt(req.params.id);

  try {
    // Buscar la section pro el parametro id
    const section = await Section.byId(SectionId);

    // Buscar el project por el parmaetro de la var section project_id
    const project = await Project.byId(section.project_id); 

    // Si el usuario el user_id del var project es diferente al parametro user.id del request, entonces retornar error 403
    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a esta seccion"
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

// Middleware que verifica la existencia del proyecto en el usuario autenticado para validar la creacion de la seccion   
const authCreateSection = async (req: Request, res: Response, next: NextFunction) => {
  let body = req.body;

  try {
    // Buscar proyecto por el parametro del body project_id
    const project = await Project.byId(body.project_id); 

    //  Si el parametro user_id del proyecto es difernete del usuario autenticado, entonces retornara un json con el error 403
    if(project.user_id != req.user.id) {
      return res.status(403).json({
        ok: false,
        err: {
          message: "No tienes acceso a este proyecto"
        }
      });
    }

    // Validar exisntencia
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


export {authSectionByUser, authCreateSection};