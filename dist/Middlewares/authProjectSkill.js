"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCreateSkillByUser = exports.authProjectSkillByUser = void 0;
const Project_1 = __importDefault(require("../Models/Project"));
const authProjectSkillByUser = async (req, res, next) => {
    let projectId = parseInt(req.params.project_id);
    try {
        const project = await Project_1.default.byId(projectId);
        if (project.user_id != req.user.id) {
            return res.status(403).json({
                ok: false,
                err: {
                    message: "No tienes acceso a esta accion"
                }
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            ok: false,
            err: {
                name: err.name,
                message: err.message
            }
        });
    }
};
exports.authProjectSkillByUser = authProjectSkillByUser;
const authCreateSkillByUser = async (req, res, next) => {
    let body = req.body;
    try {
        const project = await Project_1.default.byId(body.project_id);
        if (project.user_id != req.user.id) {
            return res.status(403).json({
                ok: false,
                err: {
                    message: "No tienes acceso a esta accion"
                }
            });
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            ok: false,
            err: {
                name: err.name,
                message: err.message
            }
        });
    }
};
exports.authCreateSkillByUser = authCreateSkillByUser;
