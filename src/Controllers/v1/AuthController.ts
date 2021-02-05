import {Request, Response} from 'express';
import User from '../../Models/User';
import Admin from '../../Models/Admin';
import jwt = require('jsonwebtoken');
import  bcrypt = require('bcrypt');

import { JwtEnv } from '../../config/config';

class UserAuthController {
  public async login(req:  Request, res: Response){
    let body = req.body;
    try {
      let user = await User.byEmail(body.email);

      console.log(body);

      if(!user){
        return res.status(401).json({
          ok: false,
          err: {
            message: "El (email) y contraseña son incorrectos"
          }
        });
      }

      if(!bcrypt.compareSync(body.password, user.password) ){
        return res.status(401).json({
          ok: false,
          err: {
            message: "El email y (contraseña) son incorrectos"
          }
        });
      }

      const token = jwt.sign({user}, JwtEnv.privateUsKey, JwtEnv.signOptions );

      return res.status(200).json({
        ok: true,
        user,
        token
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

class AdminAuthController {
  public async login(req:  Request, res: Response){
    let body = req.body;
    try {
      let admin = await Admin.byEmail(body.email);

      console.log(admin);

      if(!admin){
        return res.status(401).json({
          ok: false,
          err: {
            message: "El (email) y contraseña son incorrectos"
          }
        });
      }

      if(!bcrypt.compareSync(body.password, admin.password) ){
        return res.status(401).json({
          ok: false,
          err: {
            message: "El email y (contraseña) son incorrectos"
          }
        });
      }

      const token = jwt.sign({admin}, JwtEnv.privateAdKey, JwtEnv.signOptions );

      return res.status(200).json({
        ok: true,
        admin,
        token
      })

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err
      })
    }
  }
}

export { AdminAuthController, UserAuthController };