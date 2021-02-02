import { db } from '../db/db';
import Model from './Model';
import { ModelData, AdminData } from '../interfaces/Models';

interface ModelAndAdmin extends ModelData, AdminData {}

export default class Admin extends Model {
  
  protected name:string;
  protected email:string;
  protected password:string;

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
      let data:any = await db.query(`SELECT * FROM tasks WHERE id=?`, [id]);
      if(!data[0]){
        return false;
      }
      let instance = new this(data[0]);
      return instance;
    } catch (err) {
      return err;
    }
  }

  static async create(body:ModelAndAdmin) {
    let query:any = await db.query(
      `INSERT INTO tasks (name, email, password) VALUES (?,?,?) RETURNING *`,
      [body.name, body.email, body.password]
    );
    return query[0];
  }

  async update(body:ModelAndAdmin) {
    let query:any =  await db.queryPatch(`UPDATE tasks SET data? WHERE id = ? RETURNING *`, [body, this.id]);
    return query[0];
  }

  async delete() {
    let data = await db.query( `DELETE FROM tasks WHERE id = ?`, [this.id]);
    return data;
  }
}