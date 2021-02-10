"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("../Models/Model"));
;
class User extends Model_1.default {
    constructor(user) {
        super(user);
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = user.password;
        this.img = user.img;
        this.main_img = user.main_img;
        this.description = user.description;
    }
    static async byEmail(email) {
        try {
            let data = await db_1.db.query(`SELECT * FROM users WHERE email = ?`, [email]);
            if (!data[0]) {
                return false;
            }
            this.ins = new this(data[0]);
            return this.ins;
        }
        catch (error) {
            return error;
        }
    }
    async skills() {
        let data = await db_1.db.query(`
      SELECT skills.id, skills.name, skills.icon, skills.admin_id, skills.updated_at, skills.created_at 
      FROM users INNER JOIN user_skills ON users.id=user_skills.user_id
      INNER JOIN skills ON user_skills.skill_id=skills.id
      WHERE users.id = ?
    `, [this.id]);
        return data;
    }
    async jobs() {
        let data = db_1.db.query(`
      SELECT jobs.id, jobs.company, jobs.init, jobs.finish, jobs.description, jobs.user_id, jobs.updated_at, jobs.created_at
      FROM users INNER JOIN jobs ON users.id=jobs.user_id
      WHERE jobs.user_id=?
    `, [this.id]);
        return data;
    }
    async projects() {
        let data = db_1.db.query(`
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM users INNER JOIN projects ON users.id=projects.user_id
      WHERE projects.user_id=? 
    `, [this.id]);
        return data;
    }
}
exports.default = User;
User.table = "users";
