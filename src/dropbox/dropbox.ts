import fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
import { dropboxEnv } from '../config/config';

// Clase que ejecuta api de Dropbox
export default class DropboxApi {
    static instance:DropboxApi;
    protected dbx: any;

    constructor(){
      // Instancia de dropbox
      // pasar clave de token y libreria fetch como parametros  
      this.dbx = new Dropbox({accessToken: dropboxEnv, fetch});  
    }

    // Inicializar calse
    static on(){
      this.instance = this.instance || new this();
      return this.instance;
    }

    // Lista de los archivos almacenados de la aplicacion dropbox
    // Recibe parametros -> path:string, callback:function
    listFolder(path:string, callback:Function){
      this.dbx.filesListFolder({path})
        .then((response:any) => callback(null, response))
        .catch((error:any) => callback(error)); 
    }

    // Subir archivos a aplicacion dropbox
    // Recibe parametros -> path:string (nombre de la imagen), contents:img (data de la imagen), callback:function
    upload(path:string, contents:any, callback:Function ){
      this.dbx.filesUpload({path, contents})
        .then( (response:any) => callback(null, response))
        .catch( (error:any) => callback(error));
    }

    // Crear link publico de archivo de la aplicacion dropbox
    // Recibe parametros -> path:string (path_display de la imagen subida), callback:function
    sharedLink(path:string, callback:Function){
      this.dbx.sharingCreateSharedLinkWithSettings({path})
        .then((response:any) => callback(null, response))
        .catch((error:any) => callback(error));
    }

    // Eliminar archivos de aplicacion dropbox
    // Recibe parametros -> path:string (nombre de la imagen que se encuentra almacenada), callback:function
    delete(path:string, callback:Function){
      this.dbx.filesDelete({path})
        .then((response:any) => callback(null, response))
        .catch((error:any) => callback(error));
    }

}
