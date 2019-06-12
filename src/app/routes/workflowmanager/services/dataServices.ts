import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    }

    //流程模型
    public model_list(data): any {
        return this.baseServices.getData("modelApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //模型删除
    public model_delete(data): any {
        return this.baseServices.getData("modelApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //创建模型
    public model_create(data): any {
        return this.baseServices.postData("app/rest/models", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //导出xml
    public model_export(data): any {
        return this.baseServices.getData("modelApiService/export", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //部署model
    public model_deploymodel(data): any {
        return this.baseServices.getData("modelApiService/deploymodel", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    //部署model
    public process_find(data): any {
        return this.baseServices.getData("defProcessApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public processGet(data): any {
        return this.baseServices.getData("defProcessApiService/get", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //查看流程图
    public process_viewimage(data): any {
        return this.baseServices.getData("defProcessApiService/viewimage", data,WebConfig.RequestUrl.flowableworkflow)
    }
    

    //createprocess
    public process_create(data): any {
        return this.baseServices.getData("defProcessApiService/createprocess", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //流程删除
    public process_delete(data): any {
        return this.baseServices.getData("defProcessApiService/deleteprocess", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //在办流程查询
    public taskfind(data): any {
        return this.baseServices.getData("taskApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //在办流程查询
    public task_finishcurrtask(data): any {
        return this.baseServices.postData("taskApiService/finishcurrtask", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //在办流程查询
    public task_delete(data): any {
        return this.baseServices.getData("taskApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //当前流程
    public opentaskComponent(data): any {
        return this.baseServices.getData("taskApiService/opentaskComponent", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    //查看流程环节
    public process_defact(data): any {
        return this.baseServices.getData("defProcessApiService/process_defact", data,WebConfig.RequestUrl.flowableworkflow)
    }

    /*service*/
    public tcomponentList(data): any {
        return this.baseServices.getData("TComponentApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tcomponentIn(data): any {
        return this.baseServices.postData("TComponentApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tcomponentUp(data): any {
        return this.baseServices.postData("TComponentApiService/update", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tcomponentDel(data): any {
        return this.baseServices.getData("TComponentApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public Component_findbytype(data): any {
        return this.baseServices.getData("TComponentApiService/findbytype", data,WebConfig.RequestUrl.flowableworkflow)
    }
    /*service*/
    public tcomponenttypeList(data): any {
        return this.baseServices.getData("TComponenttypeApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tcomponenttypeIn(data): any {
        return this.baseServices.postData("TComponenttypeApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tcomponenttypeUp(data): any {
        return this.baseServices.postData("TComponenttypeApiService/update", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tcomponenttypeDel(data): any {
        return this.baseServices.getData("TComponenttypeApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public Componenttype_childlist(data): any {
        return this.baseServices.getData("TComponenttypeApiService/childlist", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tprocesscomponentList(data): any {
        return this.baseServices.getData("TProcesscomponentApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    public tprocesscomponentIn(data): any {
        return this.baseServices.postData("TProcesscomponentApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    public tprocesscomponentUp(data): any {
        return this.baseServices.postData("TProcesscomponentApiService/update", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    public tprocesscomponentDel(data): any {
        return this.baseServices.getData("TProcesscomponentApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }  
    public findAllComponentByDefAct(data): any {
        return this.baseServices.getData("TComponentApiService/findAllComponentByDefAct", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public prowercomponent(data): any {
        return this.baseServices.getData("TComponentApiService/prowercomponent", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tprocesscontentList(data): any {
        return this.baseServices.getData("TProcesscontentApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tprocesscontentIn(data): any {
        return this.baseServices.postData("TProcesscontentApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tprocesscontentUp(data): any {
        return this.baseServices.postData("TProcesscontentApiService/update", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tprocesscontentDel(data): any {
        return this.baseServices.getData("TProcesscontentApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //锁定任务
    public task_locktask(data): any {
        return this.baseServices.getData("taskApiService/locktask", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //释放任务
    public task_unlocktask(data): any {
        return this.baseServices.getData("taskApiService/unlocktask", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //历史节点
    public hisprocesstask(data): any {
        return this.baseServices.postData("taskApiService/hisprocesstask", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //流程驳回
    public rollbacktask(data): any {
        return this.baseServices.postData("taskApiService/rollbacktask", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //驳回意见
    public rollbackadvice(data): any {
        return this.baseServices.postData("taskApiService/rollbackadvice", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //流程图
    public processDiagram(data): any {
        return this.baseServices.getData("taskApiService/processDiagram", data,WebConfig.RequestUrl.flowableworkflow)
    }
    /*service*/
    public tworkflowroleList(data): any {
        return this.baseServices.getData("TWorkflowroleApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tworkflowroleIn(data): any {
        return this.baseServices.postData("TWorkflowroleApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tworkflowroleUp(data): any {
        return this.baseServices.postData("TWorkflowroleApiService/update", data,WebConfig.RequestUrl.flowableworkflow)
    }

    public tworkflowroleDel(data): any {
        return this.baseServices.getData("TWorkflowroleApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //用户
    public enterprise_findAllUser(data): any {
        return this.baseServices.getData("TAdminuserApiService/enterprise_findAllUser", data,WebConfig.RequestUrl.baseservice)
    }
    public tuserworkflowroleList(data): any {
        return this.baseServices.getData("TUserworkflowroleApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tuserworkflowroleIn(data): any {
        return this.baseServices.postData("TUserworkflowroleApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tuserworkflowroleDel(data): any {
        return this.baseServices.getData("TUserworkflowroleApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //授权用户
    public roleproweruser(data): any {
        return this.baseServices.getData("TUserworkflowroleApiService/roleproweruser", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tprocessenterpriseList(data): any {
        return this.baseServices.getData("TProcessenterpriseApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    public tprocessenterpriseIn(data): any {
        return this.baseServices.postData("TProcessenterpriseApiService/insert", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    public tprocessenterpriseUp(data): any {
        return this.baseServices.postData("TProcessenterpriseApiService/update", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
    public tprocessenterpriseDel(data): any {
        return this.baseServices.getData("TProcessenterpriseApiService/delete", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //授权流程
    public tprocessenterprise_prowerprocess(data): any {
        return this.baseServices.getData("TProcessenterpriseApiService/prowerprocess", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //企业流程
    public enterprise_process(data): any {
        return this.baseServices.getData("defProcessApiService/enterprise_process", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public troleprocessList(data): any {
        return this.baseServices.getData("TRoleprocessApiService/find", data,WebConfig.RequestUrl.flowableworkflow)
    }
    //角色授权流程
    public troleprocess_prowerprocess(data): any {
        return this.baseServices.getData("TRoleprocessApiService/prowerprocess", data,WebConfig.RequestUrl.flowableworkflow)
    }
    
}