import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class loginServices {
    constructor(public baseServices:baseServices) { 
    }

    //会员登入
    public loginSuperUser(data): any {
        return this.baseServices.postData("TAdminuserApiService/SuperValidAdminUser", data,WebConfig.RequestUrl.baseservice)
    }

    public login(data):any{
        var object = this.baseServices.getData("TAdminuserApiService/find",data,WebConfig.RequestUrl.baseservice)
        console.log(object)
        return object
    }
}