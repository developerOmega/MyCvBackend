import express = require('express');
const app:express.Application = express();

import RouterAdmin from './admins';
import RouterUser from './users';
import RouterSkill from './skills';
import RouterProject from './projects'
import RouterSection from './sections'
import RouterJob from './jobs';
import RouterUserSkill from './userSkills';
import RouterProjectSkill from './projectSkills';
import RouterAuth from './auth';

app.use(RouterAdmin);
app.use(RouterUser);
app.use(RouterSkill);
app.use(RouterProject);
app.use(RouterSection);
app.use(RouterJob);
app.use(RouterUserSkill);
app.use(RouterProjectSkill);
app.use(RouterAuth);

export default app;