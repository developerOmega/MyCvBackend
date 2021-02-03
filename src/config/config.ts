const fs = require('fs');

// ====================================
// Puerto
// ====================================
const port:number|string = process.env.PORT || 3000;

// ====================================
// Entorno
// ====================================
const nodeEnv:string = process.env.NODE_ENV || 'development';

// ====================================
// Entorno de Dropbox
// ====================================
// const dropboxEnv = nodeEnv === 'development' ?  'Dw2AgsFcyFYAAAAAAAAAAZDWXWtrAdyGtmc6M2vsv7hRGpeLPrAp1fk1KKTEavYm' : process.env.DROPBOX;

// ====================================
// JsonWebToken
// ====================================
class JwtEnv {

  static signOptions:object = {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  "RS256"
  };

  static verifyOptions:object = {
    issuer:  'Mysoft corp',
    subject:  'some@user.com',
    audience:  'http://mysoftcorp.in',
    expiresIn:  "48h",
    algorithm:  ["RS256"]
  };

  // static publicKey = nodeEnv === 'development' ? fs.readFileSync('server/key/public.key', 'utf8') : process.env.PUBLIC_KEY.replace(/\\n/gm, '\n');
  // static privateKey = nodeEnv === 'development' ? fs.readFileSync('server/key/private.key', 'utf8') : process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'); 
}

// ====================================
// Base de datos
// ====================================

class DatabaseEnv {
  static host:string = nodeEnv === 'development' ? 'localhost' : process.env.HOST || '';
  static user:string = nodeEnv === 'development' ? 'postgres' : process.env.USER || '';
  static password :string= nodeEnv === 'development' ? '1234' : process.env.PASSWORD || '';
  static database:string = nodeEnv === 'development' ? 'mycv' : process.env.DATABASE || '';
  static port:string = nodeEnv === 'development' ? '5432' : process.env.PORTDB || '';
}


export { 
  port, nodeEnv, JwtEnv, DatabaseEnv
};