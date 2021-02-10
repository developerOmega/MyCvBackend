"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authJobByUser = void 0;
const Job_1 = __importDefault(require("../Models/Job"));
const authJobByUser = async (req, res, next) => {
    let jobId = parseInt(req.params.id);
    try {
        const job = await Job_1.default.byId(jobId);
        if (job.user_id != req.user.id) {
            return res.status(403).json({
                ok: false,
                err: {
                    message: "No tienes acceso a este trabajo"
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
exports.authJobByUser = authJobByUser;
