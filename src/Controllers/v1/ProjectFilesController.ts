import Project from '../../Models/Project';

import FilesController from '../FilesController';

// Configurar datos de controlador para manejar los metodos globales de la clase padre FilesController

export default class UserImgFilesController extends FilesController{

  // ruta de imagne default
  protected fileName:string;

  // prefijo para nombrar el archivo que se subira a dropbox (ej. us-img, us-main-img)
  protected pref:string;

  // propiedad que es igualada a la instancia del modelo
  protected ins = Project

  constructor( ) {
    super();
    this.fileName  = '/images/project.png';
    this.pref = 'pro-img'; 
  }
}
