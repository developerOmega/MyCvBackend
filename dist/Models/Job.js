"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
;
class Job extends Model_1.default {
    constructor(job) {
        super(job);
        this.company = job.company;
        this.description = job.description;
        this.init = job.init;
        this.finish = job.finish;
        this.user_id = job.user_id;
    }
    async user() {
        let data = db_1.db.query(`
      SELECT users.id, users.first_name, users.last_name, users.email, users.img, users.main_img, users.description, users.updated_at, users.created_at
      FROM jobs INNER JOIN jobs.user_id=users.id
      WHERE jobs.id=? 
    `, [this.id]);
        return data[0];
    }
}
exports.default = Job;
Job.table = 'jobs';
