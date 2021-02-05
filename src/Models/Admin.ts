import { db } from '../db/db';
import Model from './Model';
import { ModelData, AdminData } from '../interfaces/Models';

interface ModelAndAdmin extends ModelData, AdminData {}

export default class Admin extends Model {
  
  protected name:string;
  protected email:string;
  protected password:string;

  static ins: Admin;
  static table:string = "admins";

  constructor(admin:ModelAndAdmin){
    super(admin);
    this.name = this.strip(admin.name);
    this.email = this.strip(admin.email);
    this.password = this.strip(admin.password);

  }

  static async byEmail(email:string){
    
    try {  
      let data:any = await db.query(`SELECT * FROM admins WHERE email = ?`, [email]);
  
      if(!data[0]){
        return false;
      }
  
      this.ins = new this(data[0]);
      return this.ins;

    } catch (error) {
      return error;
    }
  }

  public async skills() {
    let data = await db.query(
      `SELECT skills.name, skills.icon FROM skills 
      INNER JOIN admins ON skills.admin_id=admins.id 
      WHERE skills.admin_id= ? ;`,
      [ this.id ]
    )

    return data;
  }
  
}