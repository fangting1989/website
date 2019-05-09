import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    }

    //流程模型
    public model_list(data): any {
        return this.baseServices.getData("modelApiService/find", data,WebConfig.RequestUrl.workflowservice)
    }
    //模型删除
    public model_delete(data): any {
        return this.baseServices.getData("modelApiService/delete", data,WebConfig.RequestUrl.workflowservice)
    }
    //创建模型
    public model_create(data): any {
        return this.baseServices.postData("app/rest/models", data,WebConfig.RequestUrl.workflowservice)
    }
    //导出xml
    public model_export(data): any {
        return this.baseServices.getData("modelApiService/export", data,WebConfig.RequestUrl.workflowservice)
    }
    //部署model
    public model_deploymodel(data): any {
        return this.baseServices.getData("modelApiService/deploymodel", data,WebConfig.RequestUrl.workflowservice)
    }
    
    //部署model
    public process_model(data): any {
        return this.baseServices.getData("defProcessApiService/find", data,WebConfig.RequestUrl.workflowservice)
    }
    
    
}