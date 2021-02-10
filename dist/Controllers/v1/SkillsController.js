"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Skill_1 = __importDefault(require("../../Models/Skill"));
class SkillController {
    async index(req, res) {
        let init = req.query.init;
        let end = req.query.end;
        try {
            let data = await Skill_1.default.paginate(init, end);
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
            let data = await Skill_1.default.byId(id);
            if (!data) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El skill no existe"
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
            let data = await Skill_1.default.create(body);
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
            let skill = await Skill_1.default.byId(id);
            if (!skill) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El skill no existe"
                    }
                });
            }
            let data = await skill.update(body);
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
            let skill = await Skill_1.default.byId(id);
            if (!skill) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El skill no existe  "
                    }
                });
            }
            await skill.delete();
            return res.status(200).json({
                ok: true,
                message: "El skill se ha eliminado con exito"
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
            let skill = await Skill_1.default.byId(id);
            let data = await skill.admin();
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
    async indexUsers(req, res) {
        let id = parseInt(req.params.id);
        try {
            let skill = await Skill_1.default.byId(id);
            let data = await skill.users();
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
            let skill = await Skill_1.default.byId(id);
            let data = await skill.projects();
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
exports.default = SkillController;
