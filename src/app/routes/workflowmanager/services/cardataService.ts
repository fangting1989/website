import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class cardataServices {
    constructor(public baseServices: baseServices) {
    }

    public tprocList(data): any {
        return this.baseServices.getData("TProcApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tbankList(data): any {
        return this.baseServices.getData("TBankApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
}

