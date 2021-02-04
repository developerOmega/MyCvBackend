import {db} from '../db/db';
import Model from './Model';
import { SectionData, ModelData } from '../interfaces/Models';

interface ModelAndSection extends SectionData, ModelData {};

export default class Section extends Model {
  protected content:string;
  protected img:string;
  protected project_id:number;

  static ins:Section;
  static table:string = "sections";

  constructor(section:ModelAndSection){
    super(section);
    this.content = this.strip(section.content);
    this.img = this.strip(section.img);
    this.project_id = section.project_id;
  }

  public async admin(){
    let data = db.query(`
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM sections INNER JOIN projects ON sections.project_id=project.id
      WHERE sections.id=? 
    `, [this.id]);

    return data;
  }

}