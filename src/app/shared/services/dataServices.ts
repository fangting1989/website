import { Injectable } from '@angular/core';
import {baseServices} from './../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    //文件上传
    public uploadImg(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileuploadonly", data,WebConfig.RequestUrl.fileuploadpath)
    }

    //---------------公共服务部分---------------------//
    //加载枚举
    public loadEnums(names): any {
        var data = {names:names}
        return this.baseServices.getData("TExplainApiService/getexplainbynames", data,WebConfig.RequestUrl.baseservice)
    }
    public loadEnum(name): any {
        var data = {name:name}
        return this.baseServices.getData("TExplainApiService/getexplainbyname", data,WebConfig.RequestUrl.baseservice)
    }
    
}