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
        return this.baseServices.getData("taskApiService/finishcurrtask", data,WebConfig.RequestUrl.flowableworkflow)
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
    
    
}