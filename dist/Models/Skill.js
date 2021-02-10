"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
;
class Skill extends Model_1.default {
    constructor(skill) {
        super(skill);
        this.name = skill.name;
        this.icon = skill.icon;
        this.admin_id = skill.admin_id;
    }
    async admin() {
        let data = db_1.db.query(`
      SELECT admins.id, admins.name, admins.email, admins.updated_at, admins.created_at, skill.name 
      FROM admins INNER JOIN skills ON admins.id=skills.admin_id
      WHERE skills.id = ?
    `, [this.id]);
        return data[0];
    }
    async users() {
        let data = db_1.db.query(`
      SELECT users.id, users.first_name, users.last_name, users.email, users.img, users.main_img, users.description, users.updated_at, users.created_at 
      FROM skills INNER JOIN user_skills ON skills.id=user_skills.skill_id
      INNER JOIN users ON user_skills.user_id=users.id WHERE skills.id = ?     
    `, [this.id]);
        return data;
    }
    async projects() {
        let data = db_1.db.query(`
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM skills INNER JOIN project_skills ON skills.id=project_skills.skill_id
      INNER JOIN projects ON project_skills.project_id=projects.id
      WHERE skills.id = ?
    `, [this.id]);
        return data;
    }
}
exports.default = Skill;
Skill.table = "skills";
