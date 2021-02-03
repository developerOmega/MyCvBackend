import { db } from '../db/db';
import Model from './Model';
import { ModelData, AdminData } from '../interfaces/Models';

interface ModelAndAdmin extends ModelData, AdminData {}

export default class Admin extends Model {
  
  protected name:string;
  protected email:string;
  protected password:string;

  static ins: Admin;

  constructor(admin:ModelAndAdmin){
    super(admin);
    this.name = admin.name;
    this.email = admin.email;
    this.password = admin.password;
  }

  static async all(){
    const data = await db.query(`SELECT * FROM admins`);
    return data;
  }

  static async paginate (init:number = 0, end:number = 0) {
    let data = init != 0 && end != 0 ? 
      await db.query(`SELECT * FROM admins WHERE id >= ? AND id <= ? ORDER BY id ASC`, [init, end]) :
      await db.query(`SELECT * FROM admins`);
    return data;
  }

  static async byId(id:number) {
    try {
      let data:any = await db.query(`SELECT * FROM admins WHERE id=?`, [id]);
      if(!data[0]){
        return false;
      }
      this.ins = new this(data[0]);
      return this.ins;
    } catch (err) {
      return err;
    }
  }

  static async create(body:ModelAndAdmin) {

    let query:any = await db.query(
      `INSERT INTO admins data? VALUES (?,?,?) RETURNING *`,
      [body]
    );

    return query[0];
  }

  async update(body:ModelAndAdmin) {
    let query:any =  await db.queryPatch(`UPDATE admins SET data? WHERE id = ? RETURNING *`, [body, this.id]);
    return query[0];
  }

  async delete() {
    let data = await db.query( `DELETE FROM admins WHERE id = ?`, [this.id]);
    return data;
  }
}