import { Request, Response, NextFunction } from 'express';

// Middleware que valida la terminacion de las imagenes
const validateFiles = (req: Request, res: Response, next: NextFunction) => {
    // Si no hay archivo subido, lanzar un error
    if(!req.files){
        return res.status(400).json({
            ok: false,
            err: {
                message: "No se ha seleccionado ningun archivo"
            }
        });
    }

    // Capturar nombre de imagen
    let img:string = req.files.img.name;

    // Converir imagen en array, dividiendo el string en nombre y terminacion
    let cutName:string[] = img.split('.');

    // Capturar la terminacion de la imagen
    let extension:string = cutName[cutName.length - 1];

    // Array con la terminacion de los archivos validos
    let validExtension:string[] = ['png', 'jpg', 'gif', 'jpeg', 'JPEG', 'webp'];

    // Si la extenecion de la imagen no coincide con los elementos de arrat validExtencion, tetornar un json con error 400
    if(validExtension.indexOf(extension) < 0){
        return res.status(400).json({
            ok: false,
            err: {
                message: `Las extenciones permitidas son: ${ validExtension.join(', ') }.`
            }
        })    
    }

    // Validar imagen
    next();
}

export { validateFiles }
