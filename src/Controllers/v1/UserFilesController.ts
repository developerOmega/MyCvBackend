import User from '../../Models/User';

import FilesController from '../FilesController';

class UserImgFilesController extends FilesController{
  
  // Configurar datos de controlador para manejar los metodos globales de la clase padre FilesController

  // ruta de imagne default
  protected fileName:string;

  // prefijo para nombrar el archivo que se subira a dropbox (ej. us-img, us-main-img)
  protected pref:string;

  // propiedad que es igualada a la instancia del modelo
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

  // Nombre de columna que se modificara en el Modelo
  protected prop:string;
  
  protected ins = User

  constructor( ) {
    super();
    this.fileName  = '/images/main_image.png';
    this.pref = 'us-m-img';
    this.prop = 'main_img' 
  }

  // Callback que indica como se modificara la columna del Modelo
  protected updateTo(url:string | undefined):Object {
    return {
      main_img: url
    }
  }
}

export { UserImgFilesController, UserMainImgFilesController }