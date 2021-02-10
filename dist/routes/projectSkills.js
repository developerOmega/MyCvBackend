"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectSkillsController_1 = __importDefault(require("../Controllers/v1/ProjectSkillsController"));
const authJwt_1 = require("../Middlewares/authJwt");
const authProjectSkill_1 = require("../Middlewares/authProjectSkill");
const router = express_1.Router();
const PROJECTSKILL = new ProjectSkillsController_1.default();
router.post('/project-skills', [authJwt_1.authUser, authProjectSkill_1.authCreateSkillByUser], PROJECTSKILL.post);
router.delete('/project-skills/:project_id/:skill_id', [authJwt_1.authUser, authProjectSkill_1.authProjectSkillByUser], PROJECTSKILL.delete);
exports.default = router;
