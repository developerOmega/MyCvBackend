import Server from './server/server';
// import RouterAdmin from './routes/admins';
// import RouterUser from './routes/users';
import RouterIndex from './routes/Index';
import bodyParser = require('body-parser');

const port = 3000
const server = Server.init(port);

server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());

server.app.use(RouterIndex);

server.start( () => {
  console.log("Conectado al puerto ", port );
});

