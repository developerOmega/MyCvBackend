"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
const Model_1 = __importDefault(require("./Model"));
class Admin extends Model_1.default {
    constructor(admin) {
        super(admin);
        this.name = admin.name;
        this.email = admin.email;
        this.password = admin.password;
    }
    static async byEmail(email) {
        try {
            let data = await db_1.db.query(`SELECT * FROM admins WHERE email = ?`, [email]);
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
        let data = await db_1.db.query(`SELECT skills.name, skills.icon FROM skills 
      INNER JOIN admins ON skills.admin_id=admins.id 
      WHERE skills.admin_id= ? ;`, [this.id]);
        return data;
    }
}
exports.default = Admin;
Admin.table = "admins";
