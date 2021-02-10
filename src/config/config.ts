const fs = require('fs');

// ====================================
// Puerto
// ====================================
const port:any = process.env.PORT || 3000;

// ====================================
// Entorno
// ====================================
const nodeEnv:string = process.env.NODE_ENV || 'development';

// ====================================
// Entorno de Dropbox
// ====================================
const dropboxEnv = nodeEnv === 'development' ? fs.readFileSync('src/Key/dropboxToken.key', 'utf8') : process.env.DROPBOX || ''; 

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

  static publicUsKey:string = nodeEnv === 'development' ? fs.readFileSync('src/Key/publicUser.key', 'utf8') : (<any>process.env.PUBLICUS_KEY).replace(/\\n/gm, '\n') || '';
  static privateUsKey:string = nodeEnv === 'development' ? fs.readFileSync('src/Key/privateUser.key', 'utf8') : (<any>process.env.PRIVATEUS_KEY).replace(/\\n/gm, '\n' || '');
  
  static publicAdKey:string = nodeEnv === 'development' ? fs.readFileSync('src/Key/publicAdmin.key', 'utf8') : (<any>process.env.PUBLICAD_KEY).replace(/\\n/gm, '\n') || '';
  static privateAdKey:string = nodeEnv === 'development' ? fs.readFileSync('src/Key/privateAdmin.key', 'utf8') : (<any>process.env.PRIVATEAD_KEY).replace(/\\n/gm, '\n' || '');
  
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
  port, nodeEnv, JwtEnv, DatabaseEnv, dropboxEnv
};