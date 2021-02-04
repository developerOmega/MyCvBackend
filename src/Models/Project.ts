import { db } from '../db/db';
import Model from './Model';
import { ProjectData, ModelData } from '../interfaces/Models';

interface ModelAndProject extends ProjectData, ModelData {};

export default class Project extends Model {

  protected title:string;
  protected link:string;
  protected description:string;
  protected img: string;
  protected user_id:number;

  static ins:Project;
  static table:string = 'projects';

  constructor(project: ModelAndProject){
    super(project);
    this.title = this.strip(project.title);
    this.link = this.strip(project.link);
    this.description = this.strip(project.description);
    this.img = this.strip(project.img);
    this.user_id = project.user_id;
  }

  public async user() {
    let data:any = db.query(`
      SELECT users.id, users.first_name, users.last_name, users.email, users.img, users.main_img, users.description, users.updated_at, users.created_at
      FROM projects INNER JOIN users ON projects.user_id=user.id
      WHERE project.id=?
    `, [this.id])

    return data[0];
  }

  public async sections(){
    let data = db.query(`
      SELECT sections.id, sections.content, sections.img, sections.project_id, sections.updated_at, sections.created_at
      FROM projects INNER JOIN sections ON projects.id=sections.project_id
      WHERE sections.project_id=?
    `, [this.id]);
    return data;
  }

  public async skills(){
    let data = db.query(`
      SELECT skills.id, skills.name, skills.icon, skills.admin_id, skills.updated_at, skills.created_at
      FROM projects INNER JOIN project_skills ON projects.id=project_skills.project_id
      INNER JOIN skills ON project_skills.skill_id=skills.id
      WHERE projects.id=?      
    `, [this.id]);
    return data;
  }


}