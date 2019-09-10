import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public twebcoreList(data): any {
        return this.baseServices.getData("TWebcoreApiService/find", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public twebcoreIn(data): any {
        return this.baseServices.postData("TWebcoreApiService/insert", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public twebcoreUp(data): any {
        return this.baseServices.postData("TWebcoreApiService/update", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public twebcoreDel(data): any {
        return this.baseServices.getData("TWebcoreApiService/delete", data,WebConfig.RequestUrl.dpguokaiservices)
    }

    public tmemberList(data): any {
        return this.baseServices.getData("TMemberApiService/find", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberIn(data): any {
        return this.baseServices.postData("TMemberApiService/insert", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberUp(data): any {
        return this.baseServices.postData("TMemberApiService/update", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberDel(data): any {
        return this.baseServices.getData("TMemberApiService/delete", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberpicList(data): any {
        return this.baseServices.getData("TMemberpicApiService/find", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberpicIn(data): any {
        return this.baseServices.postData("TMemberpicApiService/insert", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberpicUp(data): any {
        return this.baseServices.postData("TMemberpicApiService/update", data,WebConfig.RequestUrl.dpguokaiservices)
    }
    public tmemberpicDel(data): any {
        return this.baseServices.getData("TMemberpicApiService/delete", data,WebConfig.RequestUrl.dpguokaiservices)
    }
}