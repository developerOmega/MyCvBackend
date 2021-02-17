import express = require('express');
import { server } from '../index';
// import Server from '../server/server';

import RouterAdmin from './admins';
import RouterUser from './users';
import RouterSkill from './skills';
import RouterProject from './projects'
import RouterSection from './sections'
import RouterJob from './jobs';
import RouterUserSkill from './userSkills';
import RouterProjectSkill from './projectSkills';
import RouterAuth from './auth';


const addRouter = () => {
  server.app.use(RouterAdmin);
  server.app.use(RouterUser);
  server.app.use(RouterSkill);
  server.app.use(RouterProject);
  server.app.use(RouterSection);
  server.app.use(RouterJob);
  server.app.use(RouterUserSkill);
  server.app.use(RouterProjectSkill);
  server.app.use(RouterAuth);
}

export default addRouter;