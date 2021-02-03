import Server from './server/server';
import RouterAdmin from './routes/admins';
import bodyParser = require('body-parser');

const port = 3000
const server = Server.init(port);

server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());

server.app.use(RouterAdmin);

server.start( () => {
  console.log("Conectado al puerto ", port );
});

