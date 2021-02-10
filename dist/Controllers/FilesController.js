"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropbox_1 = __importDefault(require("../dropbox/dropbox"));
const Model_1 = __importDefault(require("../Models/Model"));
class FilesController {
    constructor() {
        this.ins = Model_1.default;
        this.fileName = '/images/main_image.png';
        this.pref = 'us-img';
        this.prop = 'img';
    }
    updateTo(url) {
        return {
            img: url
        };
    }
    async evalTo(req, res) {
        let id = parseInt(req.params.id);
        let instance = await this.ins.byId(id);
        return res.status(200).json({
            eval: eval("instance." + this.prop)
        });
    }
    async post(req, res) {
        let id = parseInt(req.params.id);
        let img = req.files.img;
        let filename = `${id}${Date.now()}${this.pref}${img.name}`;
        let path = `/${filename}`;
        dropbox_1.default.on().upload(path, img.data, (err, data) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                    message: "Err in upload img"
                });
            }
            let dataPath = data.result.path_display;
            dropbox_1.default.on().sharedLink(dataPath, async (err, link) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err: {
                            message: err.message
                        },
                        message: "Err in public link"
                    });
                }
                let instance = await this.ins.byId(id);
                let data = await instance.update(this.updateTo(this.ins.imageUrl(link.result.url)));
                return res.json({
                    ok: true,
                    data,
                    message: "img se ha actualizado con exito"
                });
            });
        });
    }
    async delete(req, res) {
        let id = parseInt(req.params.id);
        let instance = await this.ins.byId(id);
        if (eval("instance." + this.prop) === this.fileName) {
            return res.status(400).json({
                ok: false,
                err: { message: "El usuario aún no cuenta con una imagen" }
            });
        }
        let path = this.ins.getImg(eval('instance.' + this.prop));
        dropbox_1.default.on().delete(path, async (err, response) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            let data = instance.update(this.updateTo(this.fileName));
            return res.status(200).json({
                ok: true,
                message: "La imagen se elimino con exito",
                data: response
            });
        });
    }
    async update(req, res) {
        let id = parseInt(req.params.id);
        let img = req.files.img;
        let instance = await this.ins.byId(id);
        if (eval("instance." + this.prop) === this.fileName) {
            return res.status(400).json({
                ok: false,
                err: { message: "El usuario aún no cuenta con una imagen" }
            });
        }
        let path = this.ins.getImg(eval('instance.' + this.prop));
        dropbox_1.default.on().delete(path, async (err, response) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            let filename = `${id}${Date.now()}${img.name}`;
            let path = `/${filename}`;
            dropbox_1.default.on().upload(path, img.data, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err,
                        message: "Err in upload img"
                    });
                }
                let dataPath = data.result.path_display;
                dropbox_1.default.on().sharedLink(dataPath, async (err, link) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err: {
                                message: err.message
                            },
                            message: "Err in public link"
                        });
                    }
                    let instance = await this.ins.byId(id);
                    let data = await instance.update(this.updateTo(this.ins.imageUrl(link.result.url)));
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
exports.default = FilesController;
