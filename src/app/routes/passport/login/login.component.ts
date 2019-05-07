import { SettingsService, _HttpClient } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService , NzModalService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { CacheService } from '@delon/cache'
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core/startup/startup.service';
import { loginServices} from '../services';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  form: FormGroup;
  error = '';
  type = 0;

  constructor(
    fb: FormBuilder,
    public msg: NzMessageService,
    private cacheService:CacheService,
    private router: Router,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    private loginServices: loginServices,
  ) {
    //验证
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, Validators.required],
    });
  }
  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }

  submit() {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    } 
    //登入
    var postData = {
      adminusertel: this.userName.value,
      adminuserpwd: this.password.value
    }
    this.loginServices.loginSuperUser(postData).subscribe(result => {
      if (result != null) {
        if (result.data == "") {
         this.msg.error("对不起,找不到用户");
        } else {
            // 清空路由复用信息
            this.reuseTabService.clear();
            var UserObject = {
              name: result.data.adminusernickname,
              leveltype:result.data.leveltype,
              enterprisecode:result.data.enterpriseid,
              keycode:result.data.keycode
            }
            this.msg.success("登入成功!"); 
            // 设置用户Token信息
            this.cacheService.set(WebConfig.UserObjectCookie.name,UserObject,
              {type:WebConfig.UserObjectCookie.type,expire:WebConfig.UserObjectCookie.expire})
            // 清空路由复用信息
            this.tokenService.set({
              token:result.data.token?result.data.token:"NOTOKEN"
            })
            // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
            this.startupSrv.load().then(() => this.router.navigate(['/']));
        }
      }
    })


  }
  ngOnDestroy(): void {
  }
}
