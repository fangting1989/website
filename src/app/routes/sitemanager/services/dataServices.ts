import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 

    public twebcoreList(data): any {
        return this.baseServices.getData("TWebcoreApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public twebcoreIn(data): any {
        return this.baseServices.postData("TWebcoreApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public twebcoreUp(data): any {
        return this.baseServices.postData("TWebcoreApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public twebcoreDel(data): any {
        return this.baseServices.getData("TWebcoreApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public uploadImg(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileupload", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public loadImg(data): any {
        return this.baseServices.getData("TFileApiService/find", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public updatefileremark(data): any {
        return this.baseServices.getData("TFileApiService/updateremark", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public ImgDel(data): any {
        return this.baseServices.getData("TFileApiService/delete", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public uploadImgonly(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileuploadonly", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public tproductList(data): any {
        return this.baseServices.getData("TProductApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tobjecttypeList(data): any {
        return this.baseServices.getData("TObjecttypeApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
}