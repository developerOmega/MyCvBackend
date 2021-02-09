import { Request, Response, NextFunction } from 'express';

const validateFiles = (req: Request, res: Response, next: NextFunction) => {
    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo"
            }
        });
    }

    let img:string = req.files.img.name;
    let cutName:string[] = img.split('.');
    let extension:string = cutName[cutName.length - 1];

    let validExtension:string[] = ['png', 'jpg', 'gif', 'jpeg', 'JPEG', 'webp'];

    if(validExtension.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: `Las extenciones permitidas son: ${ validExtension.join(', ') }.`
            }
        })    
    }

    next();
}

export { validateFiles }
