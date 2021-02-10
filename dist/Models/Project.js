"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
;
class Project extends Model_1.default {
    constructor(project) {
        super(project);
        this.title = project.title;
        this.link = project.link;
        this.description = project.description;
        this.img = project.img;
        this.user_id = project.user_id;
    }
    async user() {
        let data = db_1.db.query(`
      SELECT users.id, users.first_name, users.last_name, users.email, users.img, users.main_img, users.description, users.updated_at, users.created_at
      FROM projects INNER JOIN users ON projects.user_id=user.id
      WHERE project.id=?
    `, [this.id]);
        return data[0];
    }
    async sections() {
        let data = db_1.db.query(`
      SELECT sections.id, sections.content, sections.img, sections.project_id, sections.updated_at, sections.created_at
      FROM projects INNER JOIN sections ON projects.id=sections.project_id
      WHERE sections.project_id=?
    `, [this.id]);
        return data;
    }
    async skills() {
        let data = db_1.db.query(`
      SELECT skills.id, skills.name, skills.icon, skills.admin_id, skills.updated_at, skills.created_at
      FROM projects INNER JOIN project_skills ON projects.id=project_skills.project_id
      INNER JOIN skills ON project_skills.skill_id=skills.id
      WHERE projects.id=?      
    `, [this.id]);
        return data;
    }
}
exports.default = Project;
Project.table = 'projects';
