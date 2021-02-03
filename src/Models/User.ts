import Model from '../Models/Model';
import { UserData, ModelData } from '../interfaces/Models';

interface ModelsAndUsers extends UserData, ModelData {};

export default class User extends Model {

  protected first_name:string;
  protected last_name:string;
  protected email:string;
  protected password: string;
  protected img:string;
  protected main_img:string;
  protected description:string;

  static ins:User;
  static table:string = "users";

  constructor(user:ModelsAndUsers){
    super(user);
    this.first_name = this.strip(user.first_name);
    this.last_name = this.strip(user.last_name);
    this.email = this.strip(user.email);
    this.password = this.strip(user.password);
    this.img = this.strip(user.img);
    this.main_img = this.strip(user.main_img);
    this.description = this.strip(user.description);
  }

}