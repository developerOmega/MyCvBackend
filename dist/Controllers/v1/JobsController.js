"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Job_1 = __importDefault(require("../../Models/Job"));
class JobController {
    async index(req, res) {
        let init = req.query.init;
        let end = req.query.end;
        try {
            let data = await Job_1.default.paginate(init, end);
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
            let data = await Job_1.default.byId(id);
            if (!data) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El tabajo no existe"
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
            let data = await Job_1.default.create(body);
            return res.status(200).json({ ok: true, data });
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({
                ok: false,
                err: {
                    message: err.message
                }
            });
        }
    }
    async update(req, res) {
        let id = parseInt(req.params.id);
        let body = req.body;
        try {
            let job = await Job_1.default.byId(id);
            if (!job) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El tabajo no existe"
                    }
                });
            }
            let data = await job.update(body);
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
            let job = await Job_1.default.byId(id);
            if (!job) {
                return res.status(404).json({
                    ok: false,
                    err: {
                        message: "El tabajo no existe  "
                    }
                });
            }
            await job.delete();
            return res.status(200).json({
                ok: true,
                message: "El tabajo se ha eliminado con exito"
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
            let job = await Job_1.default.byId(id);
            let data = await job.admin();
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
exports.default = JobController;
