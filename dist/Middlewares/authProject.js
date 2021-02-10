"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProjectByUser = void 0;
const Project_1 = __importDefault(require("../Models/Project"));
const authProjectByUser = async (req, res, next) => {
    let projectId = parseInt(req.params.id);
    try {
        const project = await Project_1.default.byId(projectId);
        if (project.user_id != req.user.id) {
            return res.status(403).json({
                ok: false,
                err: {
                    message: "No tienes acceso a este proyecto"
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
exports.authProjectByUser = authProjectByUser;
