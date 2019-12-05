import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class loginServices {
    constructor(public baseServices:baseServices) { 
    }

    //增加用户
    public login(data):any{
        return this.baseServices.postData("TAdminuserApiService/ValidAdminUser",data,WebConfig.RequestUrl.baseservice)
    }

    public loginwithcode(data):any{
        return this.baseServices.postData("TAdminuserApiService/ValidAdminUserWithCode",data,WebConfig.RequestUrl.baseservice)
    }
}