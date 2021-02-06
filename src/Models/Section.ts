import {db} from '../db/db';
import Model from './Model';
import { SectionData, ModelData, ProjectData } from '../interfaces/Models';

interface ModelAndSection extends SectionData, ModelData {};

export default class Section extends Model {
  protected content:string;
  protected img:string;
  protected project_id:number;
  protected _project:any;

  static ins:Section;
  static table:string = "sections";

  constructor(section:ModelAndSection){
    super(section);
    this.content = section.content;
    this.img = section.img;
    this.project_id = section.project_id;


    this._project = new Promise((resolve, reject) => {
      this.project().then((data:any) => {
        console.log(data[0]);
        resolve(data[0]);
      }).catch(err => {
        reject(err);
      });
    })

  }

  public async project(){
    let data = db.query(`
      SELECT projects.id, projects.title, projects.link, projects.description, projects.user_id, projects.created_at, projects.updated_at
      FROM sections INNER JOIN projects ON sections.project_id=projects.id
      WHERE sections.id=? 
    `, [this.id]);

    return data;
  }

}