import fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
import { dropboxEnv } from '../config/config';

export default class DropboxApi {
    static instance:DropboxApi;
    protected dbx: any;

    constructor(){
      this.dbx = new Dropbox({accessToken: dropboxEnv, fetch});  
    }

    static on(){
      this.instance = this.instance || new this();
      return this.instance;
    }

    listFolder(path:string, callback:Function){
      this.dbx.filesListFolder({path})
        .then((response:any) => callback(null, response))
        .catch((error:any) => callback(error)); 
    }

    upload(path:string, contents:any, callback:Function ){
      this.dbx.filesUpload({path, contents})
        .then( (response:any) => callback(null, response))
        .catch( (error:any) => callback(error));
    }

    sharedLink(path:string, callback:Function){
      this.dbx.sharingCreateSharedLinkWithSettings({path})
        .then((response:any) => callback(null, response))
        .catch((error:any) => callback(error));
    }

    delete(path:string, callback:Function){
      this.dbx.filesDelete({path})
        .then((response:any) => callback(null, response))
        .catch((error:any) => callback(error));
    }

}
