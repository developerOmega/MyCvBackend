import { db } from '../db/db';
import Model from './Model';
import { ModelData, AdminData } from '../interfaces/Models';

interface ModelAndAdmin extends ModelData, AdminData {}

export default class Admin extends Model {
  
  protected name:string;
  protected email:string;
  protected password:string;

  static ins: Admin;
  static table:string = "admins";

  constructor(admin:ModelAndAdmin){
    super(admin);
    this.name = admin.name;
    this.email = admin.email;
    this.password = admin.password;

  }

}