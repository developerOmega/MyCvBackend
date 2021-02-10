"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../../Models/Project"));
class ProjectController {
    async index(req, res) {
        let init = req.query.init;
        let end = req.query.end;
        try {
            let data = await Project_1.default.paginate(init, end);
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
            let data = await Project_1.default.byId(id);
            if (!data) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El proyecto no existe"
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
        body.user_id = req.user.id;
        try {
            let data = await Project_1.default.create(body);
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
            let project = await Project_1.default.byId(id);
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El proyecto no existe"
                    }
                });
            }
            let data = await project.update(body);
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
            let project = await Project_1.default.byId(id);
            if (!project) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El proyecto no existe  "
                    }
                });
            }
            await project.delete();
            return res.status(200).json({
                ok: true,
                message: "El proyecto se ha eliminado con exito"
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
    async indexUser(req, res) {
        let id = parseInt(req.params.id);
        try {
            let project = await Project_1.default.byId(id);
            let data = await project.user();
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
    async indexSections(req, res) {
        let id = parseInt(req.params.id);
        try {
            let project = await Project_1.default.byId(id);
            let data = await project.sections();
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
    async indexSkills(req, res) {
        let id = parseInt(req.params.id);
        try {
            let project = await Project_1.default.byId(id);
            let data = await project.skills();
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
}
exports.default = ProjectController;
