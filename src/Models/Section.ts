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
    this.img = this.strip(section.content);
    this.project_id = section.project_id;
  }

}