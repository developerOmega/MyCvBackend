"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.authAdmin = void 0;
const jwt = require("jsonwebtoken");
const config_1 = require("../config/config");
const authUser = (req, res, next) => {
    let token = req.get('Authorization') || '';
    jwt.verify(token, config_1.JwtEnv.publicUsKey, config_1.JwtEnv.verifyOptions, (err, decode) => {
        if (err) {
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
};
exports.authUser = authUser;
const authAdmin = (req, res, next) => {
    let token = req.get('Authorization') || '';
    jwt.verify(token, config_1.JwtEnv.publicAdKey, config_1.JwtEnv.verifyOptions, (err, decode) => {
        if (err) {
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
};
exports.authAdmin = authAdmin;
