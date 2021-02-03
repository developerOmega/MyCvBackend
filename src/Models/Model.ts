import { ModelData } from '../interfaces/Models';

export default class Model {
  protected id:number;
  protected updated_at:string;
  protected created_at:string;

  static ins: Model;
  
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

  static async byId (id:number) {
    let params:ModelData = {
      id: 1, updated_at: "qwe", created_at: "ty"
    }

    this.ins = new Model(params);

    return this.ins;
  }

  static async create (body:ModelData):Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  async update (body:ModelData):Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }

  async delete () : Promise<unknown> {
    return new Promise((resolve, reject) => {

    })
  }
}

