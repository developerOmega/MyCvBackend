"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserSkill_1 = __importDefault(require("../../Models/UserSkill"));
class UserSkillController {
    async post(req, res) {
        let body = req.body;
        try {
            let data = await UserSkill_1.default.create(body);
            return res.status(200).json({ ok: true, data });
        }
        catch (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    }
    async delete(req, res) {
        let userId = parseInt(req.params.user_id);
        let skillId = parseInt(req.params.skill_id);
        try {
            await UserSkill_1.default.deleteById(userId, skillId);
            return res.status(200).json({
                ok: true,
                message: "La relacion user-skill ha eliminado con exito"
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
exports.default = UserSkillController;
