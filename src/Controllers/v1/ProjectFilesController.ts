import Project from '../../Models/Project';

import FilesController from '../FilesController';

export default class UserImgFilesController extends FilesController{

  protected fileName:string;
  protected pref:string;
  protected ins = Project

  constructor( ) {
    super();
    this.fileName  = '/images/project.png';
    this.pref = 'pro-img'; 
  }
}
