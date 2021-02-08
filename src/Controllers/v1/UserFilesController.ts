import { Request, Response } from 'express';
import DropboxApi from '../../dropbox/dropbox';
import User from '../../Models/User';

export default class UserFilesController {
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
}