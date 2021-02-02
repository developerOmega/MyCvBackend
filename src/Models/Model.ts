import { ModelData } from '../interfaces/Models';

export default class Model {
  protected id:number;
  protected updated_at:string;
  protected created_at:string;
  
  constructor(model: ModelData){
    this.id = model.id;
    this.updated_at = model.updated_at;
    this.created_at = model.created_at;
  }

  static async all () {}

  static async paginate (init:number = 0, end:number = 0) {}

  static async byId (id:number) {}

  static async create (body:string) {}

  async udpate (body:string) {}

  async delete () {}
}

