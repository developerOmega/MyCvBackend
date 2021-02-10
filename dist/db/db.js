"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgresql_1 = __importDefault(require("./postgresql"));
const config_1 = require("../config/config");
const params = {
    host: config_1.DatabaseEnv.host,
    user: config_1.DatabaseEnv.user,
    password: config_1.DatabaseEnv.password,
    database: config_1.DatabaseEnv.database,
    port: config_1.DatabaseEnv.port
};
const db = postgresql_1.default.instance(params);
exports.db = db;
