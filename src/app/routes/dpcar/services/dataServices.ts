import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public loancreditresultList(data): any {
        return this.baseServices.getData("LoanCreditResultApiService/find", data,WebConfig.RequestUrl.dpcarworkservice)
    }

    public loancreditresultIn(data): any {
        return this.baseServices.postData("LoanCreditResultApiService/insert", data,WebConfig.RequestUrl.dpcarworkservice)
    }

    public loancreditresultUp(data): any {
        return this.baseServices.postData("LoanCreditResultApiService/update", data,WebConfig.RequestUrl.dpcarworkservice)
    }

    public loancreditresultDel(data): any {
        return this.baseServices.getData("LoanCreditResultApiService/delete", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    public loanorderList(data): any {
        return this.baseServices.getData("LoanOrderApiService/find", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    
    public loanorderIn(data): any {
        return this.baseServices.postData("LoanOrderApiService/insert", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    
    public loanorderUp(data): any {
        return this.baseServices.postData("LoanOrderApiService/update", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    
    public loanorderDel(data): any {
        return this.baseServices.getData("LoanOrderApiService/delete", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    public loanorderprocessList(data): any {
        return this.baseServices.getData("LoanOrderProcessApiService/find", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    
    public loanorderprocessIn(data): any {
        return this.baseServices.postData("LoanOrderProcessApiService/insert", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    
    public loanorderprocessUp(data): any {
        return this.baseServices.postData("LoanOrderProcessApiService/update", data,WebConfig.RequestUrl.dpcarworkservice)
    }
    
    public loanorderprocessDel(data): any {
        return this.baseServices.getData("LoanOrderProcessApiService/delete", data,WebConfig.RequestUrl.dpcarworkservice)
    }
}