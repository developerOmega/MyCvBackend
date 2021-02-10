"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SkillsController_1 = __importDefault(require("../Controllers/v1/SkillsController"));
const authJwt_1 = require("../Middlewares/authJwt");
const router = express_1.Router();
const SKILL = new SkillsController_1.default();
router.get('/skills', SKILL.index);
router.get('/skills/:id', SKILL.show);
router.post('/skills', authJwt_1.authAdmin, SKILL.post);
router.put('/skills/:id', authJwt_1.authAdmin, SKILL.update);
router.delete('/skills/:id', authJwt_1.authAdmin, SKILL.delete);
router.get('/skills/:id/admin', SKILL.indexAdmin);
router.get('/skills/:id/users', SKILL.indexUsers);
router.get('/skills/:id/projects', SKILL.indexProjects);
exports.default = router;
