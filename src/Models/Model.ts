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

  static async all ():Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  static async paginate (init:number = 0, end:number = 0):Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  static async byId (id:number):Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  static async create (body:ModelData):Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  async udpate (body:ModelData):Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  async delete () : Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }
}

