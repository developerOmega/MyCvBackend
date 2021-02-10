"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Section_1 = __importDefault(require("../../Models/Section"));
const FilesController_1 = __importDefault(require("../FilesController"));
class UserImgFilesController extends FilesController_1.default {
    constructor() {
        super();
        this.ins = Section_1.default;
        this.fileName = '';
        this.pref = 'sec-img';
    }
}
exports.default = UserImgFilesController;
