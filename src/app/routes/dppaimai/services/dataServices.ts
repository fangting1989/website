import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public twebcoreList(data): any {
        return this.baseServices.getData("TWebcoreApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public twebcoreIn(data): any {
        return this.baseServices.postData("TWebcoreApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public twebcoreUp(data): any {
        return this.baseServices.postData("TWebcoreApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public twebcoreDel(data): any {
        return this.baseServices.getData("TWebcoreApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    } 

    public tmemberList(data): any {
        return this.baseServices.getData("TMemberApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tmemberIn(data): any {
        return this.baseServices.postData("TMemberApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tmemberUp(data): any {
        return this.baseServices.postData("TMemberApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tmemberDel(data): any {
        return this.baseServices.getData("TMemberApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tproductList(data): any {
        return this.baseServices.getData("TProductApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tproductIn(data): any {
        return this.baseServices.postData("TProductApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tproductUp(data): any {
        return this.baseServices.postData("TProductApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tproductDel(data): any {
        return this.baseServices.getData("TProductApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    //加载图片
    public loadImg(data): any {
        return this.baseServices.getData("TFileApiService/find", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public ImgDel(data): any {
        return this.baseServices.getData("TFileApiService/delete", data,WebConfig.RequestUrl.fileuploadpath)
    }
    //上传图
    public uploadImgonly(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileuploadonly", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public uploadImg(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileupload", data,WebConfig.RequestUrl.fileuploadpath)
    }
}