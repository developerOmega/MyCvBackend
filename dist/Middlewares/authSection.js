"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCreateSection = exports.authSectionByUser = void 0;
const Section_1 = __importDefault(require("../Models/Section"));
const Project_1 = __importDefault(require("../Models/Project"));
const authSectionByUser = async (req, res, next) => {
    let SectionId = parseInt(req.params.id);
    try {
        const section = await Section_1.default.byId(SectionId);
        const project = await Project_1.default.byId(section.project_id);
        if (project.user_id != req.user.id) {
            return res.status(403).json({
                ok: false,
                err: {
                    message: "No tienes acceso a esta seccion"
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
exports.authSectionByUser = authSectionByUser;
const authCreateSection = async (req, res, next) => {
    let body = req.body;
    try {
        const project = await Project_1.default.byId(body.project_id);
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
exports.authCreateSection = authCreateSection;
