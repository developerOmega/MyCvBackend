import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { JwtEnv } from '../config/config';

const authUser = (req: Request, res: Response, next: NextFunction) => {
  let token:string= req.get('Authorization') || '';

  jwt.verify(token, JwtEnv.publicUsKey, JwtEnv.verifyOptions, (err:any, decode:any) => {
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