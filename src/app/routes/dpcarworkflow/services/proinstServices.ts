import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class proinstServices {
    constructor(public baseServices: baseServices) {
    }

    public add_variable(data): any {
        return this.baseServices.postData("taskApiService/add_variable", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public remove_variable(data): any {
        return this.baseServices.postData("taskApiService/remove_variable", data,WebConfig.RequestUrl.flowableworkflow)
    }
}