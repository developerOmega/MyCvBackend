"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../Models/User"));
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const config_1 = require("../../config/config");
class UserController {
    async index(req, res) {
        let init = req.query.init;
        let end = req.query.end;
        try {
            let data = await User_1.default.paginate(init, end);
            return res.status(200).json({
                ok: true,
                data
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
    async show(req, res) {
        let id = req.params.id;
        try {
            let data = await User_1.default.byId(id);
            if (!data) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El usuario no existe"
                    }
                });
            }
            return res.status(200).json({
                ok: true,
                data
            });
        }
        catch (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    }
    async post(req, res) {
        let body = req.body;
        try {
            let params = {
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                password: bcrypt.hashSync(body.password, 10),
                description: body.description
            };
            let data = await User_1.default.create(params);
            let user = await User_1.default.byEmail(body.email);
            let token = jwt.sign({ user }, config_1.JwtEnv.privateUsKey, config_1.JwtEnv.signOptions);
            return res.status(200).json({ ok: true, data, token });
        }
        catch (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    }
    async update(req, res) {
        let id = parseInt(req.params.id);
        let body = req.body;
        try {
            let user = await User_1.default.byId(id);
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El usuario no existe"
                    }
                });
            }
            let data = await user.update(body);
            return res.status(200).json({
                ok: true,
                data
            });
        }
        catch (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    }
    async delete(req, res) {
        let id = parseInt(req.params.id);
        try {
            let user = await User_1.default.byId(id);
            if (!user) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El usuario no existe  "
                    }
                });
            }
            await user.delete();
            return res.status(200).json({
                ok: true,
                message: "El usuario se ha eliminado con exito"
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
    async indexSkills(req, res) {
        let id = parseInt(req.params.id);
        try {
            let user = await User_1.default.byId(id);
            let data = await user.skills();
            return res.status(200).json({
                ok: true,
                data
            });
        }
        catch (err) {
            return res.status(500).json({
                ok: false,
                err: err
            });
        }
    }
    async indexJobs(req, res) {
        let id = parseInt(req.params.id);
        try {
            let user = await User_1.default.byId(id);
            let data = await user.jobs();
            return res.status(200).json({
                ok: true,
                data
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
    async indexProjects(req, res) {
        let id = parseInt(req.params.id);
        try {
            let user = await User_1.default.byId(id);
            let data = await user.projects();
            return res.status(200).json({
                ok: true,
                data
            });
        }
        catch (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
    }
    async updatePassword(req, res) {
        let body = req.body;
        let id = parseInt(req.params.id);
        let user = await User_1.default.byId(id);
        try {
            let data = await user.update({ password: bcrypt.hashSync(body.new_password, 10) });
            return res.status(200).json({
                ok: true,
                data
            });
        }
        catch (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    }
}
exports.default = UserController;
