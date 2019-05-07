import { Injectable } from '@angular/core';
import {baseServices} from './../../core/net';

@Injectable()
export class defaultServices {
    constructor(public baseServices: baseServices) {
    }
    
    //加载菜单
    public loadMenu(data): any { 
        return this.baseServices.getData("TModuleApiService/usermenu", data,WebConfig.RequestUrl.baseservice)
    }
    public changePwd(data): any {
        return this.baseServices.postData("TAdminuserApiService/enterprise_changepwd", data,WebConfig.RequestUrl.baseservice)
    }
}