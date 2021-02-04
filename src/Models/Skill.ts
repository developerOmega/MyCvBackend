import { db } from '../db/db';
import Model from './Model';
import { SkillData, ModelData } from '../interfaces/Models';

interface ModelAndSkill extends SkillData, ModelData {};

export default class Skill extends Model {
  protected name:string;
  protected icon:string;
  protected admin_id:number;

  static ins:Skill;
  static table:string = "skills";

  constructor(skill: ModelAndSkill) {
    super(skill);
    this.name = this.strip(skill.name);
    this.icon = this.strip(skill.icon);
    this.admin_id = skill.admin_id;
  }

  public async admin(){
    let data:any = db.query(`
      SELECT admins.id, admins.name, admins.email, admins.updated_at, admins.created_at, skill.name 
      FROM admins INNER JOIN skills ON admins.id=skills.admin_id
      WHERE skills.id = ?
    `, [this.id]);

    return data[0];
  }

  public async users() {
    let data = db.query(`
      SELECT users.id, users.first_name, users.last_name, users.email, users.img, users.main_img, users.description, users.updated_at, users.created_at 
      FROM skills INNER JOIN user_skills ON skills.id=user_skills.skill_id
      INNER JOIN users ON user_skills.user_id=users.id WHERE skills.id = ?     
    `, [this.id]);

    return data;
  }

  public async projects() {
    let data = db.query( `
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM skills INNER JOIN project_skills ON skills.id=project_skills.skill_id
      INNER JOIN projects ON project_skills.project_id=projects.id
      WHERE skills.id = ?
    `, [this.id]);

    return data;
  }
}