import { Request, Response } from 'express';
import DropboxApi from '../../dropbox/dropbox';
import User from '../../Models/User';

export default class UserFilesController {

  protected type:string;

  constructor() {
    this.type = "Usuarios"
  }

  public async post(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let img = (<any>req.files).img;
    
    let filename = `${id}${Date.now()}us-img${img.name}`;
    let path = `/${filename}`;

    DropboxApi.on().upload(path, img.data, (err: any, data: any) => {
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

        let user = await User.byId(id);
        
        console.log(user);

        let data = await user.update({
          img: User.imageUrl(link.result.url)
        })

        req.user = data;

        return res.json({
          ok: true,
          data,
          message: "img se ha actualizado con exito"
        });

      });
    });
  }

  public async delete(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let user = await User.byId(id);

    if(user.img === '/images/main_image.png'){
      return res.status(400).json({
        ok: false,
        err: {message: "El usuario aún no cuenta con una imagen"}
      });
    }

    let cutImg:string[] = user.img.split('/');
    let fileName:string = cutImg[cutImg.length -1];
    let path = `/${fileName}`;

    DropboxApi.on().delete(path, async (err: any, response: any) => {
      if(err){
        return res.status(400).json({
          ok: false,
          err
        });
      }

      let data = user.update({
        img: '/images/main_image.png'
      });
      req.user = data;

      return res.status(200).json({
        ok: true,
        message: "La imagen se elimino con exito",
        data: response
      });

    });

  }

  public async update(req: Request, res: Response) {
    let id:number = parseInt(req.params.id);
    let img = (<any>req.files).img;

    let user = await User.byId(id);

    if(user.img === '/images/main_image.png'){
      return res.status(400).json({
        ok: false,
        err: {message: "El usuario aún no cuenta con una imagen"}
      });
    }

    let cutImg:string[] = user.img.split('/');
    let fileName:string = cutImg[cutImg.length -1];
    let path = `/${fileName}`;

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
  
          let user = await User.byId(id);
          
          console.log(user);
  
          let data = await user.update({
            img: User.imageUrl(link.result.url)
          })
  
          req.user = data;
  
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