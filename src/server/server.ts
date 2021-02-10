import express = require('express');
import path = require('path');

export default class Server{
  public app: express.Application;
  public port:any;
  
  constructor(port:number){
    this.port = port;
    this.app = express();
  }

  static init(port:any){
    return new Server(port);
  }

  private publicPath(){
    const publicPath = path.resolve(__dirname, '../../public' );
    this.app.use( express.static(publicPath));
  }

  public start(callback: Function){
    this.app.listen(this.port, callback() );
    this.publicPath();
  }
}