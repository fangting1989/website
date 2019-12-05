import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
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
    public createproinst(data): any {
        return this.baseServices.postData("ProinstApiService/createproinst", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public enterprise_process(data): any {
        return this.baseServices.getData("defProcessApiService/enterprise_process", data,WebConfig.RequestUrl.flowableworkflow)
    }
    public tfinancialList(data): any {
        return this.baseServices.getData("TFinancialApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tfinancialIn(data): any {
        return this.baseServices.postData("TFinancialApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tfinancialUp(data): any {
        return this.baseServices.postData("TFinancialApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tfinancialDel(data): any {
        return this.baseServices.getData("TFinancialApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tfindcustomerimgList(data): any {
        return this.baseServices.getData("TFileApiService/findcustomerimg", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    
    public tbankList(data): any {
        return this.baseServices.getData("TBankApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public idcard_base64_msg(data): any {
        return this.baseServices.postData("CommonApiService/idcard_base64_msg", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tfileList(data): any {
        return this.baseServices.getData("TFileApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public fileupload(data): any {
        return this.baseServices.postData("TFileApiService/fileupload", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tfileDel(data): any {
        return this.baseServices.getData("TFileApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcaraccessList(data): any {
        return this.baseServices.getData("TCaraccessApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcaraccessIn(data): any {
        return this.baseServices.postData("TCaraccessApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcaraccessUp(data): any {
        return this.baseServices.postData("TCaraccessApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tcaraccessDel(data): any {
        return this.baseServices.getData("TCaraccessApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancarList(data): any {
        return this.baseServices.getData("TLoancarApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancarIn(data): any {
        return this.baseServices.postData("TLoancarApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancarUp(data): any {
        return this.baseServices.postData("TLoancarApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancarDel(data): any {
        return this.baseServices.getData("TLoancarApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloadstageList(data): any {
        return this.baseServices.getData("TLoadstageApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloadstageIn(data): any {
        return this.baseServices.postData("TLoadstageApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloadstageUp(data): any {
        return this.baseServices.postData("TLoadstageApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloadstageDel(data): any {
        return this.baseServices.getData("TLoadstageApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanotherList(data): any {
        return this.baseServices.getData("TLoanotherApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanotherIn(data): any {
        return this.baseServices.postData("TLoanotherApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanotherUp(data): any {
        return this.baseServices.postData("TLoanotherApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanotherDel(data): any {
        return this.baseServices.getData("TLoanotherApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanpersonList(data): any {
        return this.baseServices.getData("TLoanpersonApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanpersonIn(data): any {
        return this.baseServices.postData("TLoanpersonApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanpersonUp(data): any {
        return this.baseServices.postData("TLoanpersonApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloanpersonDel(data): any {
        return this.baseServices.getData("TLoanpersonApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public temergentpersonList(data): any {
        return this.baseServices.getData("TEmergentpersonApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public temergentpersonIn(data): any {
        return this.baseServices.postData("TEmergentpersonApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public temergentpersonUp(data): any {
        return this.baseServices.postData("TEmergentpersonApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public temergentpersonDel(data): any {
        return this.baseServices.getData("TEmergentpersonApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardList(data): any {
        return this.baseServices.getData("TLoancardApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardIn(data): any {
        return this.baseServices.postData("TLoancardApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardUp(data): any {
        return this.baseServices.postData("TLoancardApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardDel(data): any {
        return this.baseServices.getData("TLoancardApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardotherList(data): any {
        return this.baseServices.getData("TLoancardotherApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardotherIn(data): any {
        return this.baseServices.postData("TLoancardotherApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardotherUp(data): any {
        return this.baseServices.postData("TLoancardotherApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tloancardotherDel(data): any {
        return this.baseServices.getData("TLoancardotherApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tliftingcarList(data): any {
        return this.baseServices.getData("TLiftingcarApiService/find", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tliftingcarIn(data): any {
        return this.baseServices.postData("TLiftingcarApiService/insert", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tliftingcarUp(data): any {
        return this.baseServices.postData("TLiftingcarApiService/update", data,WebConfig.RequestUrl.dpworksiteservices)
    }
    public tliftingcarDel(data): any {
        return this.baseServices.getData("TLiftingcarApiService/delete", data,WebConfig.RequestUrl.dpworksiteservices)
    }
}