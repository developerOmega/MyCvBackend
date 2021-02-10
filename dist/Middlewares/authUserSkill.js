"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCreateUserSkillByUser = exports.authUserSkillByUser = void 0;
const authUserSkillByUser = async (req, res, next) => {
    let userId = parseInt(req.params.user_id);
    try {
        if (userId != req.user.id) {
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
exports.authUserSkillByUser = authUserSkillByUser;
const authCreateUserSkillByUser = async (req, res, next) => {
    let body = req.body;
    try {
        if (body.user_id != req.user.id) {
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
exports.authCreateUserSkillByUser = authCreateUserSkillByUser;
