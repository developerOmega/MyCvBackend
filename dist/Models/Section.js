"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
;
class Section extends Model_1.default {
    constructor(section) {
        super(section);
        this.content = section.content;
        this.img = section.img;
        this.project_id = section.project_id;
        this._project = new Promise((resolve, reject) => {
            this.project().then((data) => {
                console.log(data[0]);
                resolve(data[0]);
            }).catch(err => {
                reject(err);
            });
        });
    }
    async project() {
        let data = db_1.db.query(`
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM sections INNER JOIN projects ON sections.project_id=projects.id
      WHERE sections.id=? 
    `, [this.id]);
        return data;
    }
}
exports.default = Section;
Section.table = "sections";
