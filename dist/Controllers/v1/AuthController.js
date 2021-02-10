"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = exports.AdminAuthController = void 0;
const User_1 = __importDefault(require("../../Models/User"));
const Admin_1 = __importDefault(require("../../Models/Admin"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config_1 = require("../../config/config");
class UserAuthController {
    async login(req, res) {
        let body = req.body;
        try {
            let user = await User_1.default.byEmail(body.email);
            console.log(body);
            if (!user) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: "El (email) y contraseña son incorrectos"
                    }
                });
            }
            if (!bcrypt.compareSync(body.password, user.password)) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: "El email y (contraseña) son incorrectos"
                    }
                });
            }
            const token = jwt.sign({ user }, config_1.JwtEnv.privateUsKey, config_1.JwtEnv.signOptions);
            return res.status(200).json({
                ok: true,
                user,
                token
            });
        }
        catch (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        }
    }
}
exports.UserAuthController = UserAuthController;
class AdminAuthController {
    async login(req, res) {
        let body = req.body;
        try {
            let admin = await Admin_1.default.byEmail(body.email);
            console.log(admin);
            if (!admin) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: "El (email) y contraseña son incorrectos"
                    }
                });
            }
            if (!bcrypt.compareSync(body.password, admin.password)) {
                return res.status(401).json({
                    ok: false,
                    err: {
                        message: "El email y (contraseña) son incorrectos"
                    }
                });
            }
            const token = jwt.sign({ admin }, config_1.JwtEnv.privateAdKey, config_1.JwtEnv.signOptions);
            return res.status(200).json({
                ok: true,
                admin,
                token
            });
        }
        catch (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    }
}
exports.AdminAuthController = AdminAuthController;
