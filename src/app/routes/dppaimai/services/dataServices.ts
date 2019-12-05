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
    public torderdetailList(data): any {
        return this.baseServices.getData("TOrderdetailApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public torderdetailIn(data): any {
        return this.baseServices.postData("TOrderdetailApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public torderdetailUp(data): any {
        return this.baseServices.postData("TOrderdetailApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public torderdetailDel(data): any {
        return this.baseServices.getData("TOrderdetailApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tsignproductList(data): any {
        return this.baseServices.getData("TSignproductApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tsignproductIn(data): any {
        return this.baseServices.postData("TSignproductApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tsignproductUp(data): any {
        return this.baseServices.postData("TSignproductApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tsignproductDel(data): any {
        return this.baseServices.getData("TSignproductApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tpaydetailList(data): any {
        return this.baseServices.getData("TPaydetailApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tpaydetailIn(data): any {
        return this.baseServices.postData("TPaydetailApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tpaydetailUp(data): any {
        return this.baseServices.postData("TPaydetailApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tpaydetailDel(data): any {
        return this.baseServices.getData("TPaydetailApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tcompactList(data): any {
        return this.baseServices.getData("TCompactApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tcompactIn(data): any {
        return this.baseServices.postData("TCompactApiService/insert", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tcompactUp(data): any {
        return this.baseServices.postData("TCompactApiService/update", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tcompactDel(data): any {
        return this.baseServices.getData("TCompactApiService/delete", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tmemberpicList(data): any {
        return this.baseServices.getData("TMemberpicApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public surecompact(data): any {
        return this.baseServices.postData("TCompactApiService/surecompact", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public download_memberfile(data): any {
        return this.baseServices.getData("CommonApiService/download_memberfile", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public importmemberdata(data): any {
        return this.baseServices.UploadFile("TMemberApiService/importmemberdata", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    public tcompactmoneyList(data): any {
        return this.baseServices.getData("TCompactmoneyApiService/find", data,WebConfig.RequestUrl.dppaimaiservices)
    }
    
}