"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db/db");
class Model {
    constructor(model) {
        this.id = model.id;
        this.updated_at = model.updated_at;
        this.created_at = model.created_at;
    }
    static strip(data) {
        return data.replace(/(<([^>]+)>)/gi, "");
    }
    static striptData(data) {
        for (let comp in data) {
            if (typeof data[comp] == 'string')
                data[comp] = this.strip(data[comp]);
        }
        return data;
    }
    static imageUrl(url) {
        if (url.match(/www.dropbox.com/)) {
            let regex = /www.dropbox.com/;
            let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
            imageUrl = imageUrl.replace(/[?]dl=0/, '');
            return imageUrl;
        }
    }
    static getImg(link) {
        let cutImg = link.split('/');
        let fileName = cutImg[cutImg.length - 1];
        return `/${fileName}`;
    }
    static async all() {
        const data = await db_1.db.query(`SELECT * FROM ${this.table}`);
        return data;
    }
    static async paginate(init = 0, end = 0) {
        let data = init != 0 && end != 0 ?
            await db_1.db.query(`SELECT * FROM ${this.table} WHERE id >= ? AND id <= ? ORDER BY id ASC`, [init, end]) :
            await db_1.db.query(`SELECT * FROM ${this.table}`);
        return data;
    }
    static async byId(id) {
        try {
            let data = await db_1.db.query(`SELECT * FROM ${this.table} WHERE id=?`, [id]);
            if (!data[0]) {
                return false;
            }
            Model.table = this.table;
            this.ins = new this(data[0]);
            return this.ins;
        }
        catch (err) {
            return err;
        }
    }
    static async create(data) {
        data = this.striptData(data);
        let query = await db_1.db.queryPost(`INSERT INTO ${this.table} data? VALUES params? RETURNING *`, [data]);
        this.ins = new this(query[0]);
        return this.ins;
    }
    async update(body) {
        body = Model.striptData(body);
        let query = await db_1.db.queryPatch(`UPDATE ${Model.table} SET data? WHERE id = ? RETURNING *`, [body, this.id]);
        return query[0];
    }
    async delete() {
        let data = await db_1.db.query(`DELETE FROM ${Model.table} WHERE id = ?`, [this.id]);
        return data;
    }
}
exports.default = Model;
Model.table = "Model";
