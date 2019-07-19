import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public datalist(data): any {
        return this.baseServices.getData("TPayconfigApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public partner(data): any {
        return this.baseServices.getData("StaticsService/partner", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tsystemconfigList(data): any {
        return this.baseServices.getData("TSystemconfigApiService/find", data,WebConfig.RequestUrl.baseservice)
    }

    //sellshop
    public sp_dayordercount(data): any {
        return this.baseServices.getData("StatisticsApiService/dayordercount", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public sp_daysaleamount(data): any {
        return this.baseServices.getData("StatisticsApiService/daysaleamount", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public sp_yesterdaysaleamount(data): any {
        return this.baseServices.getData("StatisticsApiService/yesterdaysaleamount", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public sp_lastday7saleamount(data): any {
        return this.baseServices.getData("StatisticsApiService/lastday7saleamount", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public sp_lastweekcount(data): any {
        return this.baseServices.getData("StatisticsApiService/lastweekcount", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public sp_lastmonthcount(data): any {
        return this.baseServices.getData("StatisticsApiService/lastmonthcount", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public sp_dayspancount(data): any {
        return this.baseServices.getData("StatisticsApiService/dayspancount", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public sp_getorderstate(data): any {
        return this.baseServices.postData("TOrderApiService/getorderstate", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    
    
    
    

    //
    
}