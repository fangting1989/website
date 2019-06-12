import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public datalist(data): any {
        return this.baseServices.getData("TPayconfigApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public partner(data): any {
        return this.baseServices.getData("StaticsService/partner", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tsystemconfigList(data): any {
        return this.baseServices.getData("TSystemconfigApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
}