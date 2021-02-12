import Server from './server/server';
import RouterIndex from './routes/Index';
import fileUpload from 'express-fileupload';
import { port as portLog } from './config/config';
import bodyParser = require('body-parser');

const port:any = portLog;
const server = Server.init(port);

server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());

server.app.use(fileUpload({ useTempFiles: false }));

server.app.use(RouterIndex);

server.start( () => {
  console.log("Conectado al puerto ", port );
});

