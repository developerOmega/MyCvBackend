import { db } from '../db/db';
import { AdminData, ModelData } from '../interfaces/Models';

export default class Model {
  protected id:number;
  protected updated_at:string;
  protected created_at:string;

  static ins: Model;
  static table:string = "Model";
  
  constructor(model: ModelData){
    this.id = model.id;
    this.updated_at = model.updated_at;
    this.created_at = model.created_at;
  }

  // Metodo que elimina los caractares de HTML
  // Recibe parametros -> data:string (valor del string)
  protected static strip(data:string):string {
    return data.replace(/(<([^>]+)>)/gi, "");
  }

  // Metodo que elimina los caractes HTML de un objecto
  // Recine parametros -> data:object (datos de objecto)
  protected static striptData(data:any) {
    for(let comp in data) {
      if(typeof data[comp] == 'string')
        data[comp] = this.strip(data[comp]);
    }

    return data;
  }

  // Metodo para convertir los links publicos de dropbox en links de imagens
  //  Recibe parametros -> url:string (link publico de archovo subido por el api de dbx)
  static imageUrl(url:string) {
  
    if(url.match(/www.dropbox.com/)){
      let regex = /www.dropbox.com/;
      let imageUrl = url.replace(regex, 'dl.dropboxusercontent.com');
      imageUrl = imageUrl.replace( /[?]dl=0/, '' );
      return imageUrl;
    }
  
  }

  // Metodo que busca el nombre de un archivo / imagen,
  // Recibe parametro -> link:string (Lonk donde se encuentra guardo el archivo)
  static getImg(link:string):string {
    let cutImg:string[] = link.split('/');    
    let fileName:string = cutImg[cutImg.length -1];
    return `/${fileName}`;
  }

  static async all(){
    const data = await db.query(`SELECT * FROM ${ this.table }`);
    return data;
  }

  static async paginate (init:number = 0, end:number = 0) {

    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM ${ this.table } WHERE id >= ? AND id <= ? ORDER BY id ASC`, [init, end]) :
      await db.query(`SELECT * FROM ${this.table}`);
    return data;
  }

  static async byId(id:number) {
    try {
      let data:any = await db.query(`SELECT * FROM ${ this.table } WHERE id=?`, [id]);
      if(!data[0]){
        return false;
      }

      Model.table = this.table;
      this.ins = new this(data[0]);
      return this.ins;

    } catch (err) {
      return err;
    }
  }

  static async create(data:any) {

    data = this.striptData(data);

    let query:any = await db.queryPost(
      `INSERT INTO ${this.table} data? VALUES params? RETURNING *`,
      [data]
    );

    this.ins = new this(query[0]);

    return this.ins;
  }

  async update(body:any) {

    body = Model.striptData(body);

    let query:any =  await db.queryPatch(`UPDATE ${ Model.table } SET data? WHERE id = ? RETURNING *`, [body, this.id]);
    return query[0];
  }

  async delete() {
    let data = await db.query( `DELETE FROM ${ Model.table } WHERE id = ?`, [this.id]);
    return data;
  }
}

