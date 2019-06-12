import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public tproductbrandList(data): any {
        return this.baseServices.getData("TProductbrandApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductbrandIn(data): any {
        return this.baseServices.postData("TProductbrandApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductbrandUp(data): any {
        return this.baseServices.postData("TProductbrandApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductbrandDel(data): any {
        return this.baseServices.getData("TProductbrandApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
}