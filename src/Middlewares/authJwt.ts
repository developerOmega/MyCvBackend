import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { JwtEnv } from '../config/config';

// Middleware que valida el json web token de la sesion de usuarios
const authUser = (req: Request, res: Response, next: NextFunction) => {
  //  Busacr token del Header
  let token:string= req.get('Authorization') || '';

  // Ejecutar verificacion de jwt con los parametros de: token, llabe publica de usuarios y opciones de verificacion
  jwt.verify(token, JwtEnv.publicUsKey, JwtEnv.verifyOptions, (err:any, decode:any) => {

    // Si existe un error, retornar un json con error 401
    if(err){
      return res.status(401).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }
    
    // Agregar al parametro req.user la informacion decodificada
    req.user = decode.user;
    next();
  });
}

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  let token:string= req.get('Authorization') || '';

  jwt.verify(token, JwtEnv.publicAdKey, JwtEnv.verifyOptions, (err:any, decode:any) => {
    if(err){
      return res.status(401).json({
        ok: false,
        err: {
          name: err.name,
          message: err.message
        }
      });
    }
    
    req.user = decode.user;
    next();
  });
}

export { authAdmin, authUser };