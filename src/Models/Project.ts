import Model from './Model';
import { ProjectData, ModelData } from '../interfaces/Models';

interface ModelAndProject extends ProjectData, ModelData {};

export default class Project extends Model {

  protected title:string;
  protected link:string;
  protected description:string;
  protected user_id:number;

  static ins:Project;
  static table:string = 'projects';

  constructor(project: ModelAndProject){
    super(project);
    this.title = this.strip(project.title);
    this.link = this.strip(project.link);
    this.description = this.strip(project.description);
    this.user_id = project.user_id;
  }

}