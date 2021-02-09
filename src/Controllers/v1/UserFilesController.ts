import { Request, Response } from 'express';
import DropboxApi from '../../dropbox/dropbox';
import User from '../../Models/User';

import FilesController from '../FilesController';

export default class UserFilesController extends FilesController{

  protected fileName:string;
  protected pref:string;
  protected ins = User

  constructor( ) {
    super();
    this.fileName  = '/images/main_image.png';
    this.pref = 'us-img'; 
  }
}