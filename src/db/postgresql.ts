const { Client } = require('pg');
import { QueryError } from 'mysql2';
import { QueryResult } from 'pg';
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


  // Inicializar instancia
  public static instance(data:DbConection) {
    return this._instance || ( this._instance = new this(data) );
  }

  // Metodo que retorna informacion de query
  // Recibe parametros -> query:string (consulta), data:array (datos privados)  
  public query(query:string = '', data:any[] = []) {
    
    return new Promise((resolve, reject) => {

      query = PostgreSQL.statementsPost(query, data[0]);
      query = PostgreSQL.statements(query);
      
      let body:any[] = PostgreSQL.arrayData(data[0]);

      this.connection.query( query, body, async (err:QueryError, results: QueryResult) => {
  
        if(err) {
          console.log("HAY ERROR")
          reject(err.stack);
        }
  
        resolve(results.rows);
  
      });

    });

  }

  // Metodo que retorna la actualizacion de una tabla
  /* 
    Recibe parametros -> 
      query:string = 'UPDATE table_name SET data? WHERE id=?', 
      data:array[body:object, id:number]
  */ 
  queryPatch(query:string = '', data:any[] = []) {
    return new Promise ((resolve, reject) => {
      let body:any = data[0];
      
      query = PostgreSQL.statementsPatch(query, body);
      query = PostgreSQL.statements(query);

      let colValues:string[] = Object.keys(body).map( (key:string) => body[key] );
      colValues.push(data[1]);

      this.connection.query( query, colValues, async (err: QueryError, results: QueryResult) => {
  
        if(err) {
          reject(err.stack);
        }
        
        resolve(results.rows);
  
      });

    })   
  }

  // Metodo que retorna query POST con los datos body
  // Recibe parametros -> query:string (consulta), body:object (datos de creacion)
  static statementsPost(query:string, body:any) {
    let set:string[] = [];

    Object.keys(body).forEach( key => set.push(`${key}`) );
    
    let queryProto:string[] = query.split('data?');
    queryProto.splice(1, 0, "(", set.join(', '), ")");
    
    return queryProto.join('');
  }

  // Metodo que retorna query UPDATE con los datos body
  // Recibe parametros -> query:string (consulta), body:object (datos de actualizacion)
  static statementsPatch(query:string, body:any) {
    let set:string[] = [];
    
    Object.keys(body).forEach( key => set.push(`${key}=?`) );
    
    let queryProto:string[] = query.split('data?');
    queryProto.splice(1, 0, set.join(', '));
    
    return queryProto.join('');
  }

  // Metodo que retorna query con los placeholdres '?' remplzados a '$1', '$2', ...
  // Recibe parametro -> data:string (query)
  static statements(data:string) {
    let dataProto:string[] = data.split('?');
    let dataChar:string;

    for(let i = 0; i < dataProto.length - 1; i++) {
      dataProto[i] += `$${i+1}` 
    }

    dataChar = dataProto.join('');

    return dataChar;
  }


  // Metodo que convierte objeto a un array
  // Recibe parametro -> data:object
  static arrayData( data:any ):any[]{
    let body:any[] = [];

    for(let prop in data) {
      body.push(data[prop]);
    }

    return body;
  }

}