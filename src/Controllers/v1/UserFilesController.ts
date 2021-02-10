import User from '../../Models/User';

import FilesController from '../FilesController';

class UserImgFilesController extends FilesController{

  protected fileName:string;
  protected pref:string;
  protected ins = User

  constructor( ) {
    super();
    this.fileName  = '/images/profile.png';
    this.pref = 'us-img'; 
  }
  
}

class UserMainImgFilesController extends FilesController{

  protected fileName:string;
  protected pref:string;
  protected prop:string;
  protected ins = User

  constructor( ) {
    super();
    this.fileName  = '/images/main_image.png';
    this.pref = 'us-m-img';
    this.prop = 'main_img' 
  }

  protected updateTo(url:string | undefined):Object {
    return {
      main_img: url
    }
  }
}

export { UserImgFilesController, UserMainImgFilesController }