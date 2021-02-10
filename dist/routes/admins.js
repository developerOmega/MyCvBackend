"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminsController_1 = __importDefault(require("../Controllers/v1/AdminsController"));
const authJwt_1 = require("../Middlewares/authJwt");
const router = express_1.Router();
const ADMIN = new AdminsController_1.default();
router.get('/admins', ADMIN.index);
router.get('/admins/:id', ADMIN.show);
router.post('/admins', authJwt_1.authAdmin, ADMIN.post);
router.put('/admins/:id', authJwt_1.authAdmin, ADMIN.update);
router.delete('/admins/:id', authJwt_1.authAdmin, ADMIN.delete);
router.get('/admins/:id/skills', ADMIN.indexSkills);
router.put('/admins/:id/password', authJwt_1.authAdmin, ADMIN.updatePassword);
exports.default = router;
