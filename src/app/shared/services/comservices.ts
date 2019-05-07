import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService , NzModalService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache'
@Injectable()
export class comservices {

  UserObject:any = {}

  constructor(
      private router:Router,
      private msg:NzMessageService,
      private cacheService:CacheService,
  ) {
    
  }

  get getEnterPrise(){
    this.UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(this.UserObject){
      return this.UserObject.enterprisecode
    }else{
      this.msg.error("找不到标识码")
      this.router.navigate(['/login'])
      return ""
    }
  } 
  get getUserName(){
    this.UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(this.UserObject){
      return this.UserObject.name
    }else{
      this.msg.error("找不到标识码")
      this.router.navigate(['/login'])
      return ""
    }
  }

  get getUserCode(){
    this.UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(this.UserObject){
      return this.UserObject.keycode
    }else{
      this.msg.error("找不到标识码")
      this.router.navigate(['/login'])
      return ""
    }
  } 
}
