const { Client } = require('pg');
import { DbConection } from '../interfaces/Conection';

// Clase para correr coneccion de Pgsql
export default class PostgreSQL {
  
  // Definir propiedades de la coneccion
  public connection: any;
  private host:string;
  private user:string;
  private password:string;
  private database:string;
  private port:string;

  private static _instance: PostgreSQL;

  // Ejecutar constructor para inicializar instancia
  constructor(data:DbConection){
    this.host = data.host;
    this.user = data.user;
    this.password = data.password;
    this.database = data.database;
    this.port = data.port;

    // Inicializar coneccion
    this.init();
  }

  // Metodo que inicializa coneccion a Pgsql
  private init () : void {
    this.connection = new Client({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port
    });

    this.connection.connect();
  }

  public static instance(data:DbConection) {
    return this._instance || ( this._instance = new this(data) );
  }

}