"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const JobsController_1 = __importDefault(require("../Controllers/v1/JobsController"));
const authJob_1 = require("../Middlewares/authJob");
const authJwt_1 = require("../Middlewares/authJwt");
const router = express_1.Router();
const JOB = new JobsController_1.default();
router.get('/jobs', JOB.index);
router.get('/jobs/:id', JOB.show);
router.post('/jobs', authJwt_1.authUser, JOB.post);
router.put('/jobs/:id', [authJwt_1.authUser, authJob_1.authJobByUser], JOB.update);
router.delete('/jobs/:id', [authJwt_1.authUser, authJob_1.authJobByUser], JOB.delete);
router.get('/jobs/:id/user', JOB.indexUser);
exports.default = router;
