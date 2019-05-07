import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class payServices {
    constructor(public baseServices: baseServices) {
    } 

    //配置
    public payconfigList(data): any {
        return this.baseServices.getData("TPayconfigApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public payconfigIn(data): any {
        return this.baseServices.postData("TPayconfigApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public payconfigUp(data): any {
        return this.baseServices.postData("TPayconfigApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public payconfigDel(data): any {
        return this.baseServices.getData("TPayconfigApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
}