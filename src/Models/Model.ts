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

  protected strip(data:string):string {
    return data.replace(/(<([^>]+)>)/gi, "");
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

  static async create(data:AdminData) {

    let query:any = await db.queryPost(
      `INSERT INTO ${this.table} data? VALUES params? RETURNING *`,
      [data]
    );

    this.ins = new this(query[0]);

    return this.ins;
  }

  async update(body:any) {
    let query:any =  await db.queryPatch(`UPDATE ${ Model.table } SET data? WHERE id = ? RETURNING *`, [body, this.id]);
    return query[0];
  }

  async delete() {
    let data = await db.query( `DELETE FROM ${ Model.table } WHERE id = ?`, [this.id]);
    return data;
  }
}

