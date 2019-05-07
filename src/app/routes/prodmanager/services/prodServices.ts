import { Injectable } from '@angular/core';
import {baseServices} from './../../../core/net';

@Injectable()
export class prodServices {
    constructor(public baseServices: baseServices) {
    } 

    //商品类别
    public objecttypeList(data): any {
        return this.baseServices.getData("TObjecttypeApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public objecttypeIn(data): any {
        return this.baseServices.postData("TObjecttypeApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public objecttypeUp(data): any {
        return this.baseServices.postData("TObjecttypeApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public objecttypeDel(data): any {
        return this.baseServices.getData("TObjecttypeApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }

    public objecttype_findbyparent(data): any {
        return this.baseServices.getData("TObjecttypeApiService/findbyparent", data,WebConfig.RequestUrl.sellsiteservice)
    }

    // //商品列表
    // public prodList(data): any {
    //     return this.baseServices.getData("TProductApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    // }

    // public prodIn(data): any {
    //     return this.baseServices.postData("TProductApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    // }

    // public prodUp(data): any {
    //     return this.baseServices.postData("TProductApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    // }

    // public prodDel(data): any {
    //     return this.baseServices.getData("TProductApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    // }
    //加载图片
    public loadImg(data): any {
        return this.baseServices.getData("TFileApiService/find", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public ImgDel(data): any {
        return this.baseServices.getData("TFileApiService/delete", data,WebConfig.RequestUrl.fileuploadpath)
    }
    //上传图
    public uploadImgonly(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileuploadonly", data,WebConfig.RequestUrl.fileuploadpath)
    }
    public uploadImg(data): any {
        return this.baseServices.UploadFile("TFileApiService/fileupload", data,WebConfig.RequestUrl.fileuploadpath)
    }

    public tproductList(data): any {
        return this.baseServices.getData("TProductApiService/find", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public tproductIn(data): any {
        return this.baseServices.postData("TProductApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public tproductUp(data): any {
        return this.baseServices.postData("TProductApiService/update", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public tproductDel(data): any {
        return this.baseServices.getData("TProductApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
    // 商品类别
    public getprodtypetree(data): any {
        return this.baseServices.getData("TObjecttypeApiService/getprodtypetree", data,WebConfig.RequestUrl.sellsiteservice)
    }

    //商品规格
    public tproductunitIn(data): any {
        return this.baseServices.postData("TProductunitApiService/insert", data,WebConfig.RequestUrl.sellsiteservice)
    }
    
    public tproductunitDel(data): any {
        return this.baseServices.getData("TProductunitApiService/delete", data,WebConfig.RequestUrl.sellsiteservice)
    }
}