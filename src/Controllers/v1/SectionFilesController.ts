import Section from '../../Models/Section';

import FilesController from '../FilesController';

export default class UserImgFilesController extends FilesController{

  protected fileName:string;
  protected pref:string;
  protected ins = Section

  constructor( ) {
    super();
    this.fileName  = '';
    this.pref = 'sec-img'; 
  }
}
