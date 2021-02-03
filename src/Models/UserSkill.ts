import { db } from '../db/db';
import Model from './Model';
import { UserSkillData, ModelData } from '../interfaces/Models';

interface ModelAndSkill extends UserSkillData, ModelData {};


export default class UserSkill extends Model {
  protected user_id:number;
  protected skill_id:number;

  static ins:UserSkill;
  static table:string = "user_skills";


  constructor(userSkill:ModelAndSkill){
    super(userSkill);    
    this.user_id = userSkill.user_id;
    this.skill_id= userSkill.skill_id;
  }

  static async byIds (userId:number, skillId:number) {
    try {
      let data:any = await db.query(
        `SELECT * FROM ${UserSkill.table} WHERE user_id=? AND skill_id=?`,
        [ userId, skillId ]
      );

      if(!data[0]) {
        return false;
      }

      this.ins = new this(data[0]);
      return this.ins;

    } catch (err) {
      return err;
    }
  }

  static async deleteById (userId:number, skillId:number) {
    try {
      let data = await db.query(
        `DELETE FROM ${UserSkill.table} WHERE user_id=? AND skill_id=?`,
        [userId, skillId]
      );
      return data;
    } catch (err) {
      return err;
    }
  }
}