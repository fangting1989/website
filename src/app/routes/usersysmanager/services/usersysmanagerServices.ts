import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class usersysmanagerServices {
    constructor(public baseServices: baseServices) {
    }
    //==用户类别==

    

    public usertype_childlist(data): any {
        return this.baseServices.getData("TUsertypeApiService/usertype_childlist", data,WebConfig.RequestUrl.baseservice)
    }

    public findUserType(data): any {
        return this.baseServices.getData("TUsertypeApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别编辑
    public upUserType(data): any {
        return this.baseServices.postData("TUsertypeApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别添加
    public inUserType(data): any {
        return this.baseServices.postData("TUsertypeApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别删除
    public deUserType(data): any {
        return this.baseServices.getData("TUsertypeApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //用户===============
    
    public user_findbytype(data): any {
        return this.baseServices.getData("TAdminuserApiService/user_findbytype", data,WebConfig.RequestUrl.baseservice)
    }
    public findUser(data): any {
        return this.baseServices.getData("TAdminuserApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    //用户详情
    public getUserDetail(data): any {
        return this.baseServices.getData("TAdminuserApiService/get", data,WebConfig.RequestUrl.baseservice)
    }
    //用户添加
    public inUser(data): any {
        return this.baseServices.postData("TAdminuserApiService/enterpriseuserinsert", data,WebConfig.RequestUrl.baseservice)
    }
    //用户编辑
    public upUser(data): any {
        return this.baseServices.postData("TAdminuserApiService/enterpriseuserupdate", data,WebConfig.RequestUrl.baseservice)
    }
    //用户删除
    public deUser(data): any {
        return this.baseServices.getData("TAdminuserApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别====================
    public roletype_childlist(data): any {
        return this.baseServices.getData("TRoletypeApiService/roletype_childlist", data,WebConfig.RequestUrl.baseservice)
    }
    public findRoleType(data): any {
        return this.baseServices.getData("TRoletypeApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别详情
    public upRoletype(data): any {
        return this.baseServices.postData("TRoletypeApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别添加
    public inRoleType(data): any {
        return this.baseServices.postData("TRoletypeApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别删除
    public deRoleType(data): any {
        return this.baseServices.getData("TRoletypeApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //角色
    public role_findbytype(data): any {
        return this.baseServices.getData("TRoleApiService/role_findbytype", data,WebConfig.RequestUrl.baseservice)
    }
    public findRole(data): any {
        return this.baseServices.getData("TRoleApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    //角色添加
    public inRole(data): any {
        return this.baseServices.postData("TRoleApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //角色编辑
    public upRole(data): any {
        return this.baseServices.postData("TRoleApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //角色删除
    public deRole(data): any {
        return this.baseServices.getData("TRoleApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //用户角色对象
    public findAllUserByRole(data): any {
        return this.baseServices.getData("TRoleadminuserApiService/findAllUserByRole", data,WebConfig.RequestUrl.baseservice)
    }
    //角色模块对象
    public findAllModuleByRole(data): any {
        return this.baseServices.getData("TRoleadminuserApiService/findAllModuleByRole", data,WebConfig.RequestUrl.baseservice)
    }

    //角色授权用户
    public roleproweruser(data): any {
        return this.baseServices.getData("TRoleadminuserApiService/roleproweruser", data,WebConfig.RequestUrl.baseservice)
    }
    //角色授权模块
    public roleprowermodule(data): any {
        return this.baseServices.getData("TRoleadminuserApiService/roleprowermodule", data,WebConfig.RequestUrl.baseservice)
    }
    

    
}