import {db} from '../db/db';
import Model from '../Models/Model';
import { UserData, ModelData } from '../interfaces/Models';

interface ModelsAndUsers extends UserData, ModelData {};

export default class User extends Model {

  protected first_name:string;
  protected last_name:string;
  protected email:string;
  protected password: string;
  protected img:string;
  protected main_img:string;
  protected description:string;

  static ins:User;
  static table:string = "users";

  constructor(user:ModelsAndUsers){
    super(user);
    this.first_name = this.strip(user.first_name);
    this.last_name = this.strip(user.last_name);
    this.email = this.strip(user.email);
    this.password = this.strip(user.password);
    this.img = this.strip(user.img);
    this.main_img = this.strip(user.main_img);
    this.description = this.strip(user.description);
  }

  public async skills(){
    let data = db.query(`
      SELECT skills.id, skills.name, skills.icon, skills.admin_id, skills.updated_at, skills.created_at 
      FROM users INNER JOIN user_skills ON users.id=user_skills.user_id
      INNER JOIN skills ON user_skills.skills_id=skills.id
      WHERE user.id = ?
    `, [this.id]);

    return data;
  }

  public async jobs() {
    let data = db.query(`
      SELECT jobs.id, jobs.company, jobs.init, jobs.finish, jobs.description, jobs.user_id, jobs.updated_at, jobs.created_at
      FROM users INNER JOIN jobs ON users.id=jobs.user_id
      WHERE jobs.user_id=?
    `, [this.id]);

    return data;
  }

  public async projects() {
    let data = db.query(`
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM users INNER JOIN projects ON user.id=projects.user_id
      WHERE projects.user_id=? 
    `, [this.id]);

    return data;
  }

}