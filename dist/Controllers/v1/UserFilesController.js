"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMainImgFilesController = exports.UserImgFilesController = void 0;
const User_1 = __importDefault(require("../../Models/User"));
const FilesController_1 = __importDefault(require("../FilesController"));
class UserImgFilesController extends FilesController_1.default {
    constructor() {
        super();
        this.ins = User_1.default;
        this.fileName = '/images/profile.png';
        this.pref = 'us-img';
    }
}
exports.UserImgFilesController = UserImgFilesController;
class UserMainImgFilesController extends FilesController_1.default {
    constructor() {
        super();
        this.ins = User_1.default;
        this.fileName = '/images/main_image.png';
        this.pref = 'us-m-img';
        this.prop = 'main_img';
    }
    updateTo(url) {
        return {
            main_img: url
        };
    }
}
exports.UserMainImgFilesController = UserMainImgFilesController;
