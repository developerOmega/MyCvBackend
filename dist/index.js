"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server/server"));
const Index_1 = __importDefault(require("./routes/Index"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const bodyParser = require("body-parser");
const port = 3000;
const server = server_1.default.init(port);
server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());
server.app.use(express_fileupload_1.default({ useTempFiles: false }));
server.app.use(Index_1.default);
server.start(() => {
    console.log("Conectado al puerto ", port);
});
