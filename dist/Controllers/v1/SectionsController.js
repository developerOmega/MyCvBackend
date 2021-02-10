"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Section_1 = __importDefault(require("../../Models/Section"));
class SectionController {
    async index(req, res) {
        let init = req.query.init;
        let end = req.query.end;
        try {
            let data = await Section_1.default.paginate(init, end);
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
            let data = await Section_1.default.byId(id);
            if (!data) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "La seccion no existe"
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
            let data = await Section_1.default.create(body);
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
            let section = await Section_1.default.byId(id);
            if (!section) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "La seccion no existe"
                    }
                });
            }
            let data = await section.update(body);
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
            let section = await Section_1.default.byId(id);
            if (!section) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "La seccion no existe  "
                    }
                });
            }
            await section.delete();
            return res.status(200).json({
                ok: true,
                message: "La seccion se ha eliminado con exito"
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
    async indexAdmin(req, res) {
        let id = parseInt(req.params.id);
        try {
            let section = await Section_1.default.byId(id);
            let data = await section.admin();
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
}
exports.default = SectionController;
