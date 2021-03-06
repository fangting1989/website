import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public tproductbrandList(data): any {
        return this.baseServices.getData("TProductbrandApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductbrandIn(data): any {
        return this.baseServices.postData("TProductbrandApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductbrandUp(data): any {
        return this.baseServices.postData("TProductbrandApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductbrandDel(data): any {
        return this.baseServices.getData("TProductbrandApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    //上传图
    public uploadImgonly(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileuploadonly", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public trefuseList(data): any {
        return this.baseServices.getData("TRefuseApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public trefuseIn(data): any {
        return this.baseServices.postData("TRefuseApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public trefuseUp(data): any {
        return this.baseServices.postData("TRefuseApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public trefuseDel(data): any {
        return this.baseServices.getData("TRefuseApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderList(data): any {
        return this.baseServices.getData("TOrderApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderIn(data): any {
        return this.baseServices.postData("TOrderApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderUp(data): any {
        return this.baseServices.postData("TOrderApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderDel(data): any {
        return this.baseServices.getData("TOrderApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public findcommentlist(data): any {
        return this.baseServices.getData("TOrderApiService/findcommentlist", data,WebConfig.RequestUrl.sellsiteservice)
    }
    /*service*/
    public torderdetailList(data): any {
        return this.baseServices.getData("TOrderdetailApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderdetailIn(data): any {
        return this.baseServices.postData("TOrderdetailApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderdetailUp(data): any {
        return this.baseServices.postData("TOrderdetailApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public torderdetailDel(data): any {
        return this.baseServices.getData("TOrderdetailApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public fixprise(data): any {
        return this.baseServices.getData("TOrderdetailApiService/fixprise", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemberList(data): any {
        return this.baseServices.getData("TMemberApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemberIn(data): any {
        return this.baseServices.postData("TMemberApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemberUp(data): any {
        return this.baseServices.postData("TMemberApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemberDel(data): any {
        return this.baseServices.getData("TMemberApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public find_member_sh(data): any {
        return this.baseServices.getData("TMemberApiService/find_sh", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tprorejectedList(data): any {
        return this.baseServices.getData("TProrejectedApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tprorejectedIn(data): any {
        return this.baseServices.postData("TProrejectedApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tprorejectedUp(data): any {
        return this.baseServices.postData("TProrejectedApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tprorejectedDel(data): any {
        return this.baseServices.getData("TProrejectedApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public taddressList(data): any {
        return this.baseServices.getData("TAddressApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public taddressIn(data): any {
        return this.baseServices.postData("TAddressApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public taddressUp(data): any {
        return this.baseServices.postData("TAddressApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public taddressDel(data): any {
        return this.baseServices.getData("TAddressApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public ordermoneycount(data): any {
        return this.baseServices.getData("StatisticsApiService/ordermoneycount", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public productordersale(data): any {
        return this.baseServices.getData("StatisticsApiService/productordersale", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tpointdetailList(data): any {
        return this.baseServices.getData("TPointdetailApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tpointdetailIn(data): any {
        return this.baseServices.postData("TPointdetailApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    /**会员统计 */
    public timespan_membercount(data): any {
        return this.baseServices.getData("StatisticsApiService/timespan_membercount", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public memberordermoneycost(data): any {
        return this.baseServices.getData("StatisticsApiService/memberordermoneycost", data,WebConfig.RequestUrl.sellsiteservice)
    }
    //快递接口
    public expressmsg(data): any {
        return this.baseServices.getData("CommonApiService/expressmsg", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public sp_getorderstate(data): any {
        return this.baseServices.postData("TOrderApiService/getorderstate", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public texpressList(data): any {
        return this.baseServices.getData("TExpressApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public texpressIn(data): any {
        return this.baseServices.postData("TExpressApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public texpressUp(data): any {
        return this.baseServices.postData("TExpressApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public texpressDel(data): any {
        return this.baseServices.getData("TExpressApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemticketList(data): any {
        return this.baseServices.getData("TMemticketApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemticketIn(data): any {
        return this.baseServices.postData("TMemticketApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemticketUp(data): any {
        return this.baseServices.postData("TMemticketApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tmemticketDel(data): any {
        return this.baseServices.getData("TMemticketApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public orderexpress(data): any {
        return this.baseServices.getData("TOrderApiService/orderexpress", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public trtgwsList(data): any {
        return this.baseServices.getData("TRtgwsApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public trtgwsIn(data): any {
        return this.baseServices.postData("TRtgwsApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public trtgwsUp(data): any {
        return this.baseServices.postData("TRtgwsApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public trtgwsDel(data): any {
        return this.baseServices.getData("TRtgwsApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public enterpriseuserlist(data): any {
        return this.baseServices.getData("TAdminuserApiService/enterpriseuserlist", data,WebConfig.RequestUrl.baseservice)
    }
    public tproductList(data): any {
        return this.baseServices.getData("TProductApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tproductunitList(data): any {
        return this.baseServices.getData("TProductunitApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tadviceList(data): any {
        return this.baseServices.getData("TAdviceApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tadviceIn(data): any {
        return this.baseServices.postData("TAdviceApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tadviceUp(data): any {
        return this.baseServices.postData("TAdviceApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public tadviceDel(data): any {
        return this.baseServices.getData("TAdviceApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public ttagList(data): any {
        return this.baseServices.getData("TTagApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public ttagIn(data): any {
        return this.baseServices.postData("TTagApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public ttagUp(data): any {
        return this.baseServices.postData("TTagApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public ttagDel(data): any {
        return this.baseServices.getData("TTagApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public toperatelogList(data): any {
        return this.baseServices.getData("TOperatelogApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    //批量处理
    public importdata_check(data): any {
        return this.baseServices.UploadFile("TProductApiService/importdata_check", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public importdata(data): any {
        return this.baseServices.postData("TProductApiService/importdata", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public importupdatebyname_check(data): any {
        return this.baseServices.UploadFile("TProductApiService/importupdatebyname_check", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public importupdatebyname(data): any {
        return this.baseServices.postData("TProductApiService/importupdatebyname", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public importupdatebycode_check(data): any {
        return this.baseServices.UploadFile("TProductApiService/importupdatebycode_check", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public importupdatebycode(data): any {
        return this.baseServices.postData("TProductApiService/importupdatebycode", data,WebConfig.RequestUrl.sellsiteservice)
    }
    public download_file(data): any {
        return this.baseServices.getData("CommonApiService/download_file", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
}