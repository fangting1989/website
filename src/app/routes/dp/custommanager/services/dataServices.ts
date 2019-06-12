import { Injectable } from '@angular/core';
import {baseServices} from './../../../../core/net';

@Injectable()
export class dataServices {
    constructor(public baseServices: baseServices) {
    } 
    public tcustomerList(data): any {
        return this.baseServices.getData("TCustomerApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    public tcustomerIn(data): any {
        return this.baseServices.postData("TCustomerApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    public tcustomerUp(data): any {
        return this.baseServices.postData("TCustomerApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    public tcustomerDel(data): any {
        return this.baseServices.getData("TCustomerApiService/delete", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    /*service*/
    public tlinklogList(data): any {
        return this.baseServices.getData("TLinklogApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tlinklogIn(data): any {
        return this.baseServices.postData("TLinklogApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }
    /*service*/
    public tactionList(data): any {
        return this.baseServices.getData("TActionApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tactionIn(data): any {
        return this.baseServices.postData("TActionApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tactionUp(data): any {
        return this.baseServices.postData("TActionApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tactionDel(data): any {
        return this.baseServices.getData("TActionApiService/delete", data,WebConfig.RequestUrl.dpworkservice)
    }
    //上传图
    public uploadImgonly(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileuploadonly", data,WebConfig.RequestUrl.fileuploadpath)
    }

    /*service*/
    public tpartnerList(data): any {
        return this.baseServices.getData("TPartnerApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tpartner_bzjList(data): any {
        return this.baseServices.getData("TPartnerApiService/find_bzj", data,WebConfig.RequestUrl.dpworkservice)
    }


    public tpartnerfinishList(data): any {
        return this.baseServices.getData("TPartnerApiService/findfinish", data,WebConfig.RequestUrl.dpworkservice)
    }


    public tpartnerSave(data): any {
        return this.baseServices.postData("TPartnerApiService/save", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tpartnerUp(data): any {
        return this.baseServices.postData("TPartnerApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tpartnerDel(data): any {
        return this.baseServices.getData("TPartnerApiService/delete", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tlinkpartnerDel(data): any {
        return this.baseServices.getData("TLinkpartnerApiService/delete", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tlinkpartnerList(data): any {
        return this.baseServices.getData("TLinkpartnerApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }
    //根据角色获得用户
    public findAllUserByRole(data): any {
        return this.baseServices.getData("TRoleadminuserApiService/findAllUserByRole", data,WebConfig.RequestUrl.baseservice)
    }
    public findUserObjectByRole(data): any {
        return this.baseServices.getData("TRoleadminuserApiService/findUserObjectByRole", data,WebConfig.RequestUrl.baseservice)
    }
    public tpartnerjlpj(data): any {
        return this.baseServices.postData("TPartnerApiService/jlpj", data,WebConfig.RequestUrl.dpworkservice)
    }
    //征信信息
    public tcreditmsgList(data): any {
        return this.baseServices.getData("TCreditmsgApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tcreditmsgIn(data): any {
        return this.baseServices.postData("TCreditmsgApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    public tcreditmsgUp(data): any {
        return this.baseServices.postData("TCreditmsgApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tpartnerzxtj(data): any {
        return this.baseServices.postData("TPartnerApiService/zxtj", data,WebConfig.RequestUrl.dpworkservice)
    }
    //图片上传下载
    public uploadImg(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileupload", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public loadImg(data): any {
        return this.baseServices.getData("TFileApiService/find", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public ImgDel(data): any {
        return this.baseServices.getData("TFileApiService/delete", data,WebConfig.RequestUrl.fileuploadpath)
    }
    //上传汇款单
    public tpartnerdsksh(data): any {
        return this.baseServices.postData("TPartnerApiService/dsksh", data,WebConfig.RequestUrl.dpworkservice)
    }
    //填写评审报告
    public tpartnertxpsbg(data): any {
        return this.baseServices.postData("TPartnerApiService/txpsbg", data,WebConfig.RequestUrl.dpworkservice)
    }
    //评审报告预审
    public tpartnerpsbgys(data): any {
        return this.baseServices.postData("TPartnerApiService/psbgys", data,WebConfig.RequestUrl.dpworkservice)
    }
    //评审预审
    public tpartner_psyspretg(data): any {
        return this.baseServices.postData("TPartnerApiService/psyspretg", data,WebConfig.RequestUrl.dpworkservice)
    }
    //评审一审
    public tpartnerpsystg(data): any {
        return this.baseServices.postData("TPartnerApiService/psystg", data,WebConfig.RequestUrl.dpworkservice)
    }
    //评审终审
    public tpartnerpszstg(data): any {
        return this.baseServices.postData("TPartnerApiService/pszstg", data,WebConfig.RequestUrl.dpworkservice)
    }
    public refusepass(data): any {
        return this.baseServices.postData("TPartnerApiService/refusepass", data,WebConfig.RequestUrl.dpworkservice)
    }
    

    public tproinstList(data): any {
        return this.baseServices.getData("TProinstApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    //
    /*service*/
    public tpsreportList(data): any {
        return this.baseServices.getData("TPsreportApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tpsreportIn(data): any {
        return this.baseServices.postData("TPsreportApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tpsreportUp(data): any {
        return this.baseServices.postData("TPsreportApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }
    /*service*/
    public tapprovedList(data): any {
        return this.baseServices.getData("TApprovedApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tapprovedIn(data): any {
        return this.baseServices.postData("TApprovedApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tapprovedUp(data): any {
        return this.baseServices.postData("TApprovedApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }
    //驳回
    public turnback(data): any {
        return this.baseServices.postData("TPartnerApiService/turnback", data,WebConfig.RequestUrl.dpworkservice)
    }
    //修改政策xgzc
    public xgzc(data): any {
        return this.baseServices.postData("TPartnerApiService/xgzc", data,WebConfig.RequestUrl.dpworkservice)
    }
    public zcsh(data): any {
        return this.baseServices.postData("TPartnerApiService/zcsh", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    /*TBankcard service*/
    public tbankcardList(data): any {
        return this.baseServices.getData("TBankcardApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tbankcardIn(data): any {
        return this.baseServices.postData("TBankcardApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tbankcardUp(data): any {
        return this.baseServices.postData("TBankcardApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }

    public yjd_download(data): any {
        return this.baseServices.getData("ComApiService/file", data,WebConfig.RequestUrl.dpworkservice)
    }
    public file_shd_download(data): any {
        return this.baseServices.getData("ComApiService/file_shd", data,WebConfig.RequestUrl.dpworkservice)
    }
    public twechatroleList(data): any {
        return this.baseServices.getData("TWechatroleApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    /*service*/
    public twechatuserList(data): any {
        return this.baseServices.getData("TWechatuserApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }
    public twechatuserIn(data): any {
        return this.baseServices.postData("TWechatuserApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }
    public twechatuserUp(data): any {
        return this.baseServices.postData("TWechatuserApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }
    public twechatuserDel(data): any {
        return this.baseServices.getData("TWechatuserApiService/delete", data,WebConfig.RequestUrl.dpworkservice)
    }

    public enterpriseuserlist(data): any {
        return this.baseServices.getData("TAdminuserApiService/enterpriseuserlist", data,WebConfig.RequestUrl.baseservice)
    }
    /*needmoney service*/
    public tneedmoneyList(data): any {
        return this.baseServices.getData("TNeedmoneyApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }

    public tneedmoneyIn(data): any {
        return this.baseServices.postData("TNeedmoneyApiService/insert", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tneedmoneyUp(data): any {
        return this.baseServices.postData("TNeedmoneyApiService/update", data,WebConfig.RequestUrl.dpworkservice)
    }
    public needmoney(data): any {
        return this.baseServices.getData("TNeedmoneyApiService/money", data,WebConfig.RequestUrl.dpworkservice)
    }
    //代收款
    public needmoney_dsk(data): any {
        return this.baseServices.getData("TNeedmoneyApiService/dsk", data,WebConfig.RequestUrl.dpworkservice)
    }
    public needmoney_dsk_finish(data): any {
        return this.baseServices.getData("TNeedmoneyApiService/dsk_finish", data,WebConfig.RequestUrl.dpworkservice)
    }
    //------------提现审批-----------------//
    public toutmoneyList(data): any {
        return this.baseServices.getData("TOutmoneyApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }
    public toutmoneytxsp(data): any {
        return this.baseServices.postData("TOutmoneyApiService/txsp", data,WebConfig.RequestUrl.dpworkservice)
    }
    public toutmoneyscpz(data): any {
        return this.baseServices.postData("TOutmoneyApiService/scpz", data,WebConfig.RequestUrl.dpworkservice)
    }
    public tmemberList(data): any {
        return this.baseServices.getData("TMemberApiService/find", data,WebConfig.RequestUrl.dpworkservice)
    }
    //提现审批列表
    public tx_sp_list(data): any {
        return this.baseServices.getData("TOutmoneyApiService/tx_sp_list", data,WebConfig.RequestUrl.dpworkservice)
    }
    //业务量统计
    public staticworkcount(data): any {
        return this.baseServices.getData("TPartnerApiService/staticworkcount", data,WebConfig.RequestUrl.dpworkservice)
    }
    //获得终审一审的意见
    public advice_spys(data): any {
        return this.baseServices.getData("TApprovedApiService/advice_spys", data,WebConfig.RequestUrl.dpworkservice)
    }
    public advice_ys(data): any {
        return this.baseServices.getData("TApprovedApiService/advice_ys", data,WebConfig.RequestUrl.dpworkservice)
    }
    
    
    
    

    
    
}