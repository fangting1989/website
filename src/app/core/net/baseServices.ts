import { Injectable } from '@angular/core';
import {  HttpClient, HttpResponse,HttpHeaders,HttpParams} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { _ } from 'underscore'
import { GlobalState } from '../common/global.state';
import { Router } from '@angular/router';
import {saveAs as importedSaveAs} from "file-saver";
import { environment } from '@env/environment';
import { map } from"rxjs/operators";
import { NzMessageService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache'
@Injectable()
export class baseServices {
    constructor(
        public http: HttpClient,
        private _state: GlobalState,
        private Router: Router,
        private msg:NzMessageService,
        private cacheService:CacheService
    ) { }
    public getData(methodurl, data,RequesturL): any {
        let url = WebConfig.BaseUrl +RequesturL + methodurl;
        let mparams = new HttpParams();
        _.map(data, function (prop, key) {
            if(prop != undefined && prop != null){
                mparams = mparams.append(key, prop)
            }
        })
        let mheaders = new HttpHeaders();
        mheaders.append("Token", typeof this.cacheService.getNone(WebConfig.TokenCookie.name) == "undefined" ? "" : this.cacheService.getNone(WebConfig.TokenCookie.name))
        return this.http.get(url, { params: mparams, headers: mheaders }).pipe(
            map(
                (res:any) => {
                    let retData = res;
                    if (typeof retData.token == 'undefined') {
                        //错误处理
                    }
                    if(WebConfig.Token){
                        if (retData.token == '') {
                            this.Router.navigate(['/login']);
                        }
                    }
                    if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                        this.msg.error(retData.errmsg)
                        return null
                    }
                    this.cacheService.set(WebConfig.TokenCookie.name,retData.token,
                        {type:WebConfig.TokenCookie.type,expire:WebConfig.TokenCookie.expire})
                    return retData;
                }
            )
        )
    }

    public postData(methodurl, data,RequesturL): any {
        let url = WebConfig.BaseUrl + RequesturL + methodurl;
        let mheaders = new HttpHeaders();
        //插入兼职
        mheaders.append("Token", typeof this.cacheService.getNone(WebConfig.TokenCookie.name) == "undefined" ? "" : this.cacheService.getNone(WebConfig.TokenCookie.name))
        return this.http.post(url, data, { headers: mheaders }).pipe(
            map((res: any) => {
                let retData = res;
                if (typeof retData.token == 'undefined') {
                    //错误处理
                }
                if(WebConfig.Token){
                    if (retData.token == '') {
                        this.Router.navigate(['/login']);
                    }
                }
                if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                    this.msg.error(retData.errmsg)
                    return null;
                }
                this.cacheService.set(WebConfig.TokenCookie.name,retData.token,
                    {type:WebConfig.TokenCookie.type,expire:WebConfig.TokenCookie.expire})
                return retData;
            })
        )
    }

    public UploadFile(methodurl, data,RequesturL): any {
        let url = WebConfig.BaseUrl + RequesturL + methodurl;
        let mheaders = new HttpHeaders({'X-Requested-With': 'XMLHttpRequest'});
        //插入兼职
        return this.http.post(url, data, { headers: mheaders }).pipe(
            map((res: any) => {
                let retData = res;
                if (typeof retData.token == 'undefined') {
                    //错误处理
                }
                if(WebConfig.Token){
                    if (retData.token == '') {
                        this.Router.navigate(['/login']);
                    }
                }
                if (typeof retData.errid != 'undefined' && retData.errid < 0) {
                    this.msg.error(retData.errmsg)
                    return null;
                }
                this.cacheService.set(WebConfig.TokenCookie.name,retData.token,
                    {type:WebConfig.TokenCookie.type,expire:WebConfig.TokenCookie.expire})
                return retData.data;
            })
        )
    }

    public DownLoadFile(methodurl, data,filename,RequesturL): any {
        let url = WebConfig.BaseUrl +RequesturL + methodurl;
        let mparams = new HttpParams();
        _.map(data, function (prop, key) {
            mparams.append(key, prop)
        })
        let mheaders = new HttpHeaders();
        mheaders.append("Token", typeof this.cacheService.getNone(WebConfig.TokenCookie.name) == "undefined" ? "" : this.cacheService.getNone(WebConfig.TokenCookie.name))
        return this.http.get(url, {params:mparams,headers: mheaders }).pipe(
            map((res: Response) => {
                importedSaveAs(res.blob(),filename)
                return null;
            }
        ))
    }

    
}
