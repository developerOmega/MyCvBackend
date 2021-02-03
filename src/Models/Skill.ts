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
}