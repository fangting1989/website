import { Injectable,Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService , NzModalService } from 'ng-zorro-antd';
import { CacheService } from '@delon/cache';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
@Injectable()
export class comservices {

  UserObject:any = {}

  constructor(
      private router:Router,
      private msg:NzMessageService,
      private cacheService:CacheService,
      //private dataServices:dataServices,
      @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
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

  getUserData(){
    this.UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(this.UserObject){
      return this.UserObject
    }else{
      return null;
    }
  }

  setUserData(UserObject){
    this.cacheService.set(WebConfig.UserObjectCookie.name, UserObject,
      { type: WebConfig.UserObjectCookie.type, expire: WebConfig.UserObjectCookie.expire })
  }

  //重置对应的缓存存储时间
  resetStorage(){
    var UserObject = this.cacheService.getNone(WebConfig.UserObjectCookie.name)
    if(this.UserObject){
      this.cacheService.set(WebConfig.UserObjectCookie.name,UserObject,
        {type:WebConfig.UserObjectCookie.type,expire:WebConfig.UserObjectCookie.expire})
    }
    //重置Token
    var TokenData = this.tokenService.get().token
    //重新存储
    if(this.tokenService.get().token){
      this.tokenService.set({
        token:TokenData
      })
    }
  }
}
