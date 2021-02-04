import { db } from '../db/db';
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

  public async user() {
    let data:any = db.query(`
      SELECT users.id, users.first_name, users.last_name, users.email, users.img, users.main_img, users.description, users.updated_at, users.created_at
      FROM jobs INNER JOIN jobs.user_id=users.id
      WHERE jobs.id=? 
    `, [this.id]);

    return data[0];
  }

}