"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropboxEnv = exports.DatabaseEnv = exports.JwtEnv = exports.nodeEnv = exports.port = void 0;
const fs = require('fs');
const port = process.env.PORT || 3000;
exports.port = port;
const nodeEnv = process.env.NODE_ENV || 'development';
exports.nodeEnv = nodeEnv;
const dropboxEnv = nodeEnv === 'development' ? fs.readFileSync('src/Key/dropboxToken.key', 'utf8') : process.env.DROPBOX || '';
exports.dropboxEnv = dropboxEnv;
class JwtEnv {
}
exports.JwtEnv = JwtEnv;
JwtEnv.signOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    audience: 'http://mysoftcorp.in',
    expiresIn: "48h",
    algorithm: "RS256"
};
JwtEnv.verifyOptions = {
    issuer: 'Mysoft corp',
    subject: 'some@user.com',
    audience: 'http://mysoftcorp.in',
    expiresIn: "48h",
    algorithm: ["RS256"]
};
JwtEnv.publicUsKey = nodeEnv === 'development' ? fs.readFileSync('src/Key/publicUser.key', 'utf8') : process.env.PUBLICUS_KEY.replace(/\\n/gm, '\n') || '';
JwtEnv.privateUsKey = nodeEnv === 'development' ? fs.readFileSync('src/Key/privateUser.key', 'utf8') : process.env.PRIVATEUS_KEY.replace(/\\n/gm, '\n' || '');
JwtEnv.publicAdKey = nodeEnv === 'development' ? fs.readFileSync('src/Key/publicAdmin.key', 'utf8') : process.env.PUBLICAD_KEY.replace(/\\n/gm, '\n') || '';
JwtEnv.privateAdKey = nodeEnv === 'development' ? fs.readFileSync('src/Key/privateAdmin.key', 'utf8') : process.env.PRIVATEAD_KEY.replace(/\\n/gm, '\n' || '');
class DatabaseEnv {
}
exports.DatabaseEnv = DatabaseEnv;
DatabaseEnv.host = nodeEnv === 'development' ? 'localhost' : process.env.HOST || '';
DatabaseEnv.user = nodeEnv === 'development' ? 'postgres' : process.env.USER || '';
DatabaseEnv.password = nodeEnv === 'development' ? '1234' : process.env.PASSWORD || '';
DatabaseEnv.database = nodeEnv === 'development' ? 'mycv' : process.env.DATABASE || '';
DatabaseEnv.port = nodeEnv === 'development' ? '5432' : process.env.PORTDB || '';
