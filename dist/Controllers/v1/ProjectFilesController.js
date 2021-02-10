"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../../Models/Project"));
const FilesController_1 = __importDefault(require("../FilesController"));
class UserImgFilesController extends FilesController_1.default {
    constructor() {
        super();
        this.ins = Project_1.default;
        this.fileName = '/images/project.png';
        this.pref = 'pro-img';
    }
}
exports.default = UserImgFilesController;
