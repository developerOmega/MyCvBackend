import Model from './Model';
import { JobData, ModelData } from '../interfaces/Models';

interface ModelAndJob extends JobData, ModelData {};

export default class Job extends Model {

  protected company:string;
  protected init:Date;
  protected finish:Date;
  protected description:string;
  protected user_id:number;

  static ins:Job;
  static table:string = 'jobs';

  constructor(job:ModelAndJob){
    super(job);
    this.company = this.strip(job.company);
    this.description = this.strip(job.description);
    this.init = job.init;
    this.finish = job.finish;
    this.user_id = job.user_id;
  }

}