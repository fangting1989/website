import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public tbankList(data): any {
        return this.baseServices.getData("TBankApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tbankIn(data): any {
        return this.baseServices.postData("TBankApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tbankUp(data): any {
        return this.baseServices.postData("TBankApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tbankDel(data): any {
        return this.baseServices.getData("TBankApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcustomerList(data): any {
        return this.baseServices.getData("TCustomerApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcustomerIn(data): any {
        return this.baseServices.postData("TCustomerApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcustomerUp(data): any {
        return this.baseServices.postData("TCustomerApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcustomerDel(data): any {
        return this.baseServices.getData("TCustomerApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcarbrandList(data): any {
        return this.baseServices.getData("TCarbrandApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcarbrandIn(data): any {
        return this.baseServices.postData("TCarbrandApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcarbrandUp(data): any {
        return this.baseServices.postData("TCarbrandApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcarbrandDel(data): any {
        return this.baseServices.getData("TCarbrandApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcardealerList(data): any {
        return this.baseServices.getData("TCardealerApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public findwithregion(data): any {
        return this.baseServices.getData("TCardealerApiService/findwithregion", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    
    public tcardealerIn(data): any {
        return this.baseServices.postData("TCardealerApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcardealerUp(data): any {
        return this.baseServices.postData("TCardealerApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcardealerDel(data): any {
        return this.baseServices.getData("TCardealerApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregionList(data): any {
        return this.baseServices.getData("TRegionApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregionSave(data): any {
        return this.baseServices.postData("TRegionApiService/save", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregionDel(data): any {
        return this.baseServices.getData("TRegionApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregioncardealerList(data): any {
        return this.baseServices.getData("TRegioncardealerApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregioncardealerIn(data): any {
        return this.baseServices.postData("TRegioncardealerApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregioncardealerUp(data): any {
        return this.baseServices.postData("TRegioncardealerApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tregioncardealerDel(data): any {
        return this.baseServices.getData("TRegioncardealerApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public findrtcardealer(data): any {
        return this.baseServices.getData("TRegionApiService/findrtcardealer", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public findrtbank(data): any {
        return this.baseServices.getData("TRegionApiService/findrtbank", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public customerlist(data): any {
        return this.baseServices.getData("TCustomerApiService/customerlist", data,WebConfig.RequestUrl.dpworksiteservices)
    }
}