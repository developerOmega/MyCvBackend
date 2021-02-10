"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
;
class ProjectSkill extends Model_1.default {
    constructor(projectSkill) {
        super(projectSkill);
        this.project_id = projectSkill.project_id;
        this.skill_id = projectSkill.skill_id;
    }
    static async byIds(userId, skillId) {
        try {
            let data = await db_1.db.query(`SELECT * FROM ${ProjectSkill.table} WHERE project_id=? AND skill_id=?`, [userId, skillId]);
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
            let data = await db_1.db.query(`DELETE FROM ${ProjectSkill.table} WHERE project_id=? AND skill_id=?`, [userId, skillId]);
            return data;
        }
        catch (err) {
            return err;
        }
    }
}
exports.default = ProjectSkill;
ProjectSkill.table = "project_skills";
