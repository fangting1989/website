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
}