import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class sysmanagerServices {
    constructor(public baseServices: baseServices) {
    } 
    
    //公司列表
    public enterpriseList(data): any {
        return this.baseServices.getData("TEnterpriseApiService/find", data,WebConfig.RequestUrl.baseservice)
    }

    public enterpriseInsert(data): any {
        return this.baseServices.postData("TEnterpriseApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }

    public enterpriseUpdate(data): any {
        return this.baseServices.postData("TEnterpriseApiService/update", data,WebConfig.RequestUrl.baseservice)
    }

    public enterpriseDel(data): any {
        return this.baseServices.getData("TEnterpriseApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //上传图
    public uploadImg(data): any {
        return this.baseServices.UploadFile("TFileApiService/logofileupload", data,WebConfig.RequestUrl.baseservice)
    }
    //==枚举相关==
    public typeList(data): any {
        return this.baseServices.getData("TExplaintypeApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    public childlist(data): any {
        return this.baseServices.getData("TExplaintypeApiService/childlist", data,WebConfig.RequestUrl.baseservice)
    }
    //类别详情
    public getTypeDetail(data): any {
        return this.baseServices.getData("TExplaintypeApiService/Get", data,WebConfig.RequestUrl.baseservice)
    }
    //类别编辑
    public upTypeItem(data): any {
        return this.baseServices.postData("TExplaintypeApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //类别添加
    public inTypeItem(data): any {
        return this.baseServices.postData("TExplaintypeApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //类别删除
    public deTypeItem(data): any {
        return this.baseServices.getData("TExplaintypeApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举项===============
    //枚举列表
    public findbytype(data): any {
        return this.baseServices.getData("TExplainApiService/findbytype", data,WebConfig.RequestUrl.baseservice)
    }
    public ExplainList(data): any {
        return this.baseServices.getData("TExplainApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举详情
    public getEnumDetail(data): any {
        return this.baseServices.getData("TExplainApiService/Get", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举编辑
    public upExplainItem(data): any {
        return this.baseServices.postData("TExplainApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举添加
    public inExplainItem(data): any {
        return this.baseServices.postData("TExplainApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举删除
    public deExplainItem(data): any {
        return this.baseServices.getData("TExplainApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举值=======
    public findEnumbyparent(data): any {
        return this.baseServices.getData("TEnumApiService/findbyparent", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举值添加
    public inEnumValue(data): any {
        return this.baseServices.postData("TEnumApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举值编辑
    public upEnumValue(data): any {
        return this.baseServices.postData("TEnumApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //枚举值删除
    public deEnumValue(data): any {
        return this.baseServices.getData("TEnumApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //--------------系统------------------findmenubyparent
    //模块
    public findmenubyparent(data): any {
        return this.baseServices.getData("TModuleApiService/findmenubyparent", data,WebConfig.RequestUrl.baseservice)
    }
    //模块详情
    public getmodule(data): any {
        return this.baseServices.getData("TModuleApiService/get", data,WebConfig.RequestUrl.baseservice)
    }
    //模块编辑
    public upModule(data): any {
        return this.baseServices.postData("TModuleApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //模块添加
    public inModule(data): any {
        return this.baseServices.postData("TModuleApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //模块删除
    public delModule(data): any {
        return this.baseServices.getData("TModuleApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }

    //================用户类别=============
    public findUserType(data): any {
        return this.baseServices.getData("usertypeController/find", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别详情
    public getUserTypeDetail(data): any {
        return this.baseServices.getData("usertypeController/get", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别编辑
    public upUserType(data): any {
        return this.baseServices.postData("usertypeController/update", data,WebConfig.RequestUrl.baseservice)
    }
    //用户列表
    public userList(data): any {
        return this.baseServices.postData("memberController/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别添加
    public inUserType(data): any {
        return this.baseServices.postData("usertypeController/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //用户类别删除
    public deUserType(data): any {
        return this.baseServices.getData("usertypeController/del", data,WebConfig.RequestUrl.baseservice)
    }
    //用户===============
    public findUser(data): any {
        return this.baseServices.getData("TAdminuserApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    //用户详情
    public getUserDetail(data): any {
        return this.baseServices.getData("TAdminuserApiService/get", data,WebConfig.RequestUrl.baseservice)
    }
    //用户添加
    public inUser(data): any {
        return this.baseServices.postData("TAdminuserApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //用户编辑
    public upUser(data): any {
        return this.baseServices.postData("TAdminuserApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    //用户删除
    public deUser(data): any {
        return this.baseServices.getData("TAdminuserApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别====================
    public findRoleType(data): any {
        return this.baseServices.getData("roletypeController/find", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别详情
    public getRoleTypeDetail(data): any {
        return this.baseServices.getData("roletypeController/get", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别添加
    public inRoleType(data): any {
        return this.baseServices.postData("roletypeController/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //角色类别删除
    public deRoleType(data): any {
        return this.baseServices.getData("roletypeController/del", data,WebConfig.RequestUrl.baseservice)
    }

    //角色
    public findRole(data): any {
        return this.baseServices.getData("roleController/findId", data,WebConfig.RequestUrl.baseservice)
    }
    //角色项详情
    public getRoleDetail(data): any {
        return this.baseServices.getData("roleController/get", data,WebConfig.RequestUrl.baseservice)
    }
    //角色添加
    public inRole(data): any {
        return this.baseServices.postData("roleController/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //角色编辑
    public upRole(data): any {
        return this.baseServices.postData("roleController/update", data,WebConfig.RequestUrl.baseservice)
    }
    //角色删除
    public deRole(data): any {
        return this.baseServices.getData("roleController/del", data,WebConfig.RequestUrl.baseservice)
    }
    //公司列表
    public companyList(data): any {
        return this.baseServices.getData("enterprise_baseController/find", data,WebConfig.RequestUrl.baseservice)
    }
    //公司详情
    public getCompanyDetail(data): any {
        return this.baseServices.getData("enterprise_baseController/get", data,WebConfig.RequestUrl.baseservice)
    }
    //公司保存
    public upCompanyData(data): any {
        return this.baseServices.postData("enterprise_baseController/update", data,WebConfig.RequestUrl.baseservice)
    }

    //系统
    public findSystem(data): any {
        return this.baseServices.getData("systemController/find", data,WebConfig.RequestUrl.baseservice)
    }
    //系统详情
    public getSystem(data): any {
        return this.baseServices.getData("systemController/get", data,WebConfig.RequestUrl.baseservice)
    }
    //系统编辑
    public upSystem(data): any {
        return this.baseServices.postData("systemController/update", data,WebConfig.RequestUrl.baseservice)
    }
    //系统添加
    public inSystem(data): any {
        return this.baseServices.postData("systemController/insert", data,WebConfig.RequestUrl.baseservice)
    }
    //系统删除
    public delSystem(data): any {
        return this.baseServices.getData("systemController/del", data,WebConfig.RequestUrl.baseservice)
    }
    
    //系统模块数据
    public menuList(data): any {
        return this.baseServices.getData("systemController/findsm", data,WebConfig.RequestUrl.baseservice)
    }public tloginlogList(data): any {
        return this.baseServices.getData("TLoginLogApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    
    public tloginlogIn(data): any {
        return this.baseServices.postData("TLoginLogApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    
    public tloginlogUp(data): any {
        return this.baseServices.postData("TLoginLogApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    
    public tloginlogDel(data): any {
        return this.baseServices.getData("TLoginLogApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
    public tsystemconfigList(data): any {
        return this.baseServices.getData("TSystemconfigApiService/find", data,WebConfig.RequestUrl.baseservice)
    }
    public tsystemconfigIn(data): any {
        return this.baseServices.postData("TSystemconfigApiService/insert", data,WebConfig.RequestUrl.baseservice)
    }
    public tsystemconfigUp(data): any {
        return this.baseServices.postData("TSystemconfigApiService/update", data,WebConfig.RequestUrl.baseservice)
    }
    public tsystemconfigDel(data): any {
        return this.baseServices.getData("TSystemconfigApiService/delete", data,WebConfig.RequestUrl.baseservice)
    }
}