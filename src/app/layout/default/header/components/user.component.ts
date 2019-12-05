import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { comservices } from '../../../../shared/services'
import { ModalHelper } from '@delon/theme';

import {ChangepasswordComponent} from './changepassword/changepassword.component';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar nzText="{{firstName}}" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="ChangePassword()"><i nz-icon type="user" class="mr-sm"></i>
        修改密码
      </div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
        退出登录
      </div>
    </div>
  </nz-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderUserComponent {
  firstName:any = '';
  constructor(
    public settings: SettingsService,
    private router: Router,
    private comservices:comservices,
    private modalHelper:ModalHelper,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.loadUser();

    //检测是否需要重置密码
    this.needChangedPwd();
  }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }

  loadUser(){
    var user = { 
      name:this.comservices.getUserName + ',您好!',
      avatar:'',
      email:''
    }
    try{
      if(this.comservices.getUserName.length > 0){
        this.firstName =  this.comservices.getUserName.substring(0,1)
      }
    }catch(e){

    }
    
   
    this.settings.setUser(user);
  }

  ChangePassword(){
    var self = this;
    var item = {}
    var data = {HeadText:'修改密码',itemdata:item}
    const modal = this.modalHelper.create(ChangepasswordComponent,{ data: data},{size:500}).subscribe(res => {
      
    });
  }

  needChangedPwd(){
    var userData = this.comservices.getUserData()
    if(userData.needpwdchanged){
      var self = this;
      var item = {cancelBtn:'0'}
      var data = {HeadText:'第一次登入修改密码',itemdata:item}
      const modal = this.modalHelper.create(ChangepasswordComponent,
        { data: data},
        {
          size:500,
          modalOptions:{
            nzMaskClosable:false,
            nzClosable:false
          }
        }).subscribe(res => {
        
      });
    }
  }
}
