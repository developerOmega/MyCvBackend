"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
;
class UserSkill extends Model_1.default {
    constructor(userSkill) {
        super(userSkill);
        this.user_id = userSkill.user_id;
        this.skill_id = userSkill.skill_id;
    }
    static async byIds(userId, skillId) {
        try {
            let data = await db_1.db.query(`SELECT * FROM ${UserSkill.table} WHERE user_id=? AND skill_id=?`, [userId, skillId]);
            if (!data[0]) {
                return false;
            }
            this.ins = new this(data[0]);
            return this.ins;
        }
        catch (err) {
            return err;
        }
    }
    static async deleteById(userId, skillId) {
        try {
            let data = await db_1.db.query(`DELETE FROM ${UserSkill.table} WHERE user_id=? AND skill_id=?`, [userId, skillId]);
            return data;
        }
        catch (err) {
            return err;
        }
    }
}
exports.default = UserSkill;
UserSkill.table = "user_skills";
