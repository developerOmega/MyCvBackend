"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserSkillsController_1 = __importDefault(require("../Controllers/v1/UserSkillsController"));
const authJwt_1 = require("../Middlewares/authJwt");
const authUserSkill_1 = require("../Middlewares/authUserSkill");
const router = express_1.Router();
const USERSKILL = new UserSkillsController_1.default();
router.post('/user-skills', [authJwt_1.authUser, authUserSkill_1.authCreateUserSkillByUser], USERSKILL.post);
router.delete('/user-skills/:user_id/:skill_id', [authJwt_1.authUser, authUserSkill_1.authUserSkillByUser], USERSKILL.delete);
exports.default = router;
