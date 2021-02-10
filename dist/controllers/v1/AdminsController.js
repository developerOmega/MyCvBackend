"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Admin_1 = __importDefault(require("../../Models/Admin"));
class AdminsController {
    async index(req, res) {
        let init = req.query.init;
        let end = req.query.end;
        try {
            let data = await Admin_1.default.paginate(init, end);
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
    async show(req, res) {
        let id = req.params.id;
        try {
            let data = await Admin_1.default.byId(id);
            if (!data) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El Administrador no existe"
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
            let data = await Admin_1.default.create(body);
            return res.status(200).json({ ok: true, data });
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
            let admin = await Admin_1.default.byId(id);
            if (!admin) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El Administrador no existe"
                    }
                });
            }
            let data = await admin.update(body);
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
            let admin = await Admin_1.default.byId(id);
            if (!admin) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El Administrador no existe  "
                    }
                });
            }
            await admin.delete();
            return res.status(200).json({
                ok: true,
                message: "El administrador se ha eliminado con exito"
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
exports.default = AdminsController;
