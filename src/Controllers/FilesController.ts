import { Request, Response } from 'express';
import DropboxApi from '../dropbox/dropbox';
import Model from '../Models/Model';

// Clase padre que maneja los controladores para subir archivos
export default class FilesController {
  
  // Propiedad que almacena la imagne default
  protected fileName:string;

  // Propiedad que almacena prefijo para el nombre de las imagenes de dropbox
  protected pref:string;

  // Propiedad que almacena el nombre de parametro a editar dentro de la tabla del modelo
  protected prop:string;

  // Modelo d tabla
  protected ins = Model;
  
  constructor( ) {
    this.fileName  = '/images/main_image.png';
    this.pref = 'us-img';
    this.prop = 'img'; 
  }

  // Callback para modificar campo de imgenes del registro
  // Recibe parametros -> url:string (nombre de la columna del registor; ej. img, main_img, etc )
  protected updateTo(url:string | undefined):Object {
    return {
      img: url
    }
  }

  // Controlador para subir imagenes del registor
  public async post(req: Request, res: Response) {
    // Capturar id de regidtro
    let id:number = parseInt(req.params.id);

    // Capturar datos del archivo que se subio al momento de hacer la peticion
    let img = (<any>req.files).img;
    
    // Crear nombre de imagen para dropbox 
    let filename = `${id}${Date.now()}${this.pref}${img.name}`;

    // Indicar que el nombre de la imagen dropbox esta en una ruta
    let path = `/${filename}`;

    // Funcion para subir archivos a dropbox
    // pasar parametros de ruta de carpeta, datos de la imagen y callback de resultado
    DropboxApi.on().upload(path, img.data, (err: any, data: any) => {
      
      // Si existe un error, retornar json con error 500
      if(err){
        return res.status(500).json({
          ok: false,
          err,
          message: "Err in upload img"

        });
      }

      // Capturar imagen publicada en dropbox
      let dataPath = data.result.path_display;

      // Funcion para crear un link publico de archivo de dropbox
      // parasar parametros: img publicada, callback de resultado
      DropboxApi.on().sharedLink(dataPath, async (err: any, link: any) => {
        
        // Si hay error, retornar json con error 500 
        if(err){
          return res.status(500).json({
            ok: false,
            err: {
              message: err.message
            },
            message: "Err in public link"
          })
        }

        //  Buscar Modelo por id
        let instance = await this.ins.byId(id);

        // Actualizar columna de imagen de Modelo
        let data = await instance.update(this.updateTo( this.ins.imageUrl(link.result.url) ));

        return res.json({
          ok: true,
          data,
          message: "img se ha actualizado con exito"
        });

      });
    });
  }

  // Controlador para eliminar imagenes de Modelo
  public async delete(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let instance = await this.ins.byId(id);

    // Si la propiedad de la imagen del Modelo es igual al nombre por default de imagenes, entonces retornara un json con error 400
    if(eval("instance." + this.prop) === this.fileName){
      return res.status(400).json({
        ok: false,
        err: {message: "El usuario aún no cuenta con una imagen"}
      });
    }

    // Buscar imagen del Modelo
    // Pasar como parametros la proppiedad del la imagen del  Modelo
    let path:string = this.ins.getImg( eval('instance.' + this.prop) );

    // Llamar funcion para eliminar imagen de dropbox
    DropboxApi.on().delete(path, async (err: any, response: any) => {
      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
      }

      // Actualizar columna de la imagen del Modelo a ruta por default
      let data = instance.update(this.updateTo(this.fileName));

      return res.status(200).json({
        ok: true,
        message: "La imagen se elimino con exito",
        data: response
      });

    });

  }

  // Controlador para editar imagenes del registor
  public async update(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let img = (<any>req.files).img;

    let instance = await this.ins.byId(id);

    if(eval("instance." + this.prop) === this.fileName){
      return res.status(400).json({
        ok: false,
        err: {message: "El usuario aún no cuenta con una imagen"}
      });
    }

    let path:string = this.ins.getImg( eval('instance.' + this.prop) );
    
    DropboxApi.on().delete(path, async (err: any, response: any) => {
      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
      }

      let filename = `${id}${Date.now()}${img.name}`;
      let path = `/${filename}`;

      DropboxApi.on().upload(path, img.data, (err:any, data:any) => {
        if(err){
          return res.status(500).json({
            ok: false,
            err,
            message: "Err in upload img"
  
          });
        }
  
        let dataPath = data.result.path_display;
  
  
        DropboxApi.on().sharedLink(dataPath, async (err: any, link: any) => {
          if(err){
            return res.status(500).json({
              ok: false,
              err: {
                message: err.message
              },
              message: "Err in public link"
            })
          }
  
          let instance = await this.ins.byId(id);

          let data = await instance.update(this.updateTo( this.ins.imageUrl(link.result.url) ));
        
  
          return res.json({
            ok: true,
            data,
            message: "img se ha actualizado con exito"
          });
  
        });
      });

    });   
   
  }

}