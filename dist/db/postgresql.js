"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Client } = require('pg');
class PostgreSQL {
    constructor(data) {
        this.host = data.host;
        this.user = data.user;
        this.password = data.password;
        this.database = data.database;
        this.port = data.port;
        this.init();
    }
    init() {
        this.connection = new Client({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database,
            port: this.port
        });
        this.connection.connect();
    }
    static instance(data) {
        return this._instance || (this._instance = new this(data));
    }
    query(query = '', data = []) {
        return new Promise((resolve, reject) => {
            query = PostgreSQL.statements(query);
            this.connection.query(query, data, async (err, results) => {
                if (err) {
                    reject(err.stack);
                }
                resolve(results.rows);
            });
        });
    }
    queryPost(query = '', data = []) {
        return new Promise((resolve, reject) => {
            let body = PostgreSQL.arrayData(data[0]);
            query = PostgreSQL.paramsInStatement(query, body);
            query = PostgreSQL.statementsPost(query, data[0]);
            query = PostgreSQL.statements(query);
            this.connection.query(query, body, async (err, results) => {
                if (err) {
                    reject(err.stack);
                }
                resolve(results.rows);
            });
        });
    }
    queryPatch(query = '', data = []) {
        return new Promise((resolve, reject) => {
            let body = data[0];
            query = PostgreSQL.statementsPatch(query, body);
            query = PostgreSQL.statements(query);
            let colValues = Object.keys(body).map((key) => body[key]);
            colValues.push(data[1]);
            this.connection.query(query, colValues, async (err, results) => {
                if (err) {
                    reject(err.stack);
                }
                resolve(results.rows);
            });
        });
    }
    static statementsPost(query, body) {
        let set = [];
        Object.keys(body).forEach(key => set.push(`${key}`));
        let queryProto = query.split('data?');
        queryProto.splice(1, 0, "(", set.join(', '), ")");
        return queryProto.join('');
    }
    static statementsPatch(query, body) {
        let set = [];
        Object.keys(body).forEach(key => set.push(`${key}=?`));
        let queryProto = query.split('data?');
        queryProto.splice(1, 0, set.join(', '));
        return queryProto.join('');
    }
    static statements(data) {
        let dataProto = data.split('?');
        let dataChar;
        for (let i = 0; i < dataProto.length - 1; i++) {
            dataProto[i] += `$${i + 1}`;
        }
        dataChar = dataProto.join('');
        return dataChar;
    }
    static arrayData(data) {
        let body = [];
        for (let prop in data) {
            body.push(data[prop]);
        }
        return body;
    }
    static paramsInStatement(query, body) {
        let queryProto = query.split('params?');
        let params = [];
        body.forEach(prop => params.push("?"));
        queryProto.splice(1, 0, "(", params.join(','), ")");
        return queryProto.join('');
    }
}
exports.default = PostgreSQL;
