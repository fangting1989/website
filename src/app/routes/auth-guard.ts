import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { CacheService } from '@delon/cache'
import {
  NzModalService,
  NzNotificationService,
  NzMessageService 
} from 'ng-zorro-antd';
@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  UserObject:any;
  Path :any = "/login"; 
  constructor(
    private cacheService: CacheService,
    private msg:NzMessageService,
    private Router: Router,
    private modalService:NzModalService,
    private notification: NzNotificationService
  ) {
    
  }
  canActivate() {
    return this.validCache();
  }
  canActivateChild() {
    return this.validCache(); 
  }

  validCache(){
    var self = this;
    this.UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(this.UserObject){
      return true
    }else{
      //关闭所有模块打开的对话框
      this.modalService.closeAll();
      // if(WebConfig.Token){
        // this.notification.create(
        //   'warning',
        //   '账户过期提醒',
        //   '对不起，因为您长时间没有操作系统，系统账户已过期，三秒后返回登入页面请重新登入。'
        //   ,{nzDuration:2000}
        // );
        this.msg.create('error',"对不起，因为您长时间没操作系统，用户信息已过期，请重新登入",{nzDuration:2000})
        setTimeout(function(){
          self.Router.navigate([""+self.Path+""]);
        },2000)
        return false
      // }else{
      //   return true;
      // }
    }
  }
}
