"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("isomorphic-fetch");
const Dropbox = require('dropbox').Dropbox;
const config_1 = require("../config/config");
class DropboxApi {
    constructor() {
        this.dbx = new Dropbox({ accessToken: config_1.dropboxEnv, fetch });
    }
    static on() {
        this.instance = this.instance || new this();
        return this.instance;
    }
    listFolder(path, callback) {
        this.dbx.filesListFolder({ path })
            .then((response) => callback(null, response))
            .catch((error) => callback(error));
    }
    upload(path, contents, callback) {
        this.dbx.filesUpload({ path, contents })
            .then((response) => callback(null, response))
            .catch((error) => callback(error));
    }
    sharedLink(path, callback) {
        this.dbx.sharingCreateSharedLinkWithSettings({ path })
            .then((response) => callback(null, response))
            .catch((error) => callback(error));
    }
    delete(path, callback) {
        this.dbx.filesDelete({ path })
            .then((response) => callback(null, response))
            .catch((error) => callback(error));
    }
}
exports.default = DropboxApi;
