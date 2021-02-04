import { db } from '../db/db';
import Model from './Model';
import { ProjectSkillData, ModelData } from '../interfaces/Models';

interface ModelAndSkill extends ProjectSkillData, ModelData {};


export default class ProjectSkill extends Model {
  protected project_id:number;
  protected skill_id:number;

  static ins:ProjectSkill;
  static table:string = "project_skills";


  constructor(projectSkill:ModelAndSkill){
    super(projectSkill);    
    this.project_id = projectSkill.project_id;
    this.skill_id= projectSkill.skill_id;
  }

  static async byIds (userId:number, skillId:number) {
    try {
      let data:any = await db.query(
        `SELECT * FROM ${ProjectSkill.table} WHERE project_id=? AND skill_id=?`,
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
        `DELETE FROM ${ProjectSkill.table} WHERE project_id=? AND skill_id=?`,
        [userId, skillId]
      );
      return data;
    } catch (err) {
      return err;
    }
  }
}