import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    }

    //流程模型
    public model_list(data): any {
        return this.baseServices.getData("modelApiService/list", data,WebConfig.RequestUrl.workflowservice)
    }
}