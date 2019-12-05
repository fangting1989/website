import { SettingsService, MenuService } from '@delon/theme';
import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { UUID } from 'angular2-uuid';
import { loginServices } from '../../services';
import { CacheService } from '@delon/cache'
import { ReuseTabService } from '@delon/abc';
import { StartupService } from '@core/startup/startup.service';
@Component({
  selector: 'app-loginpage-default',
  templateUrl: './loginpage-default.component.html',
  styleUrls: ['./loginpage-default.component.scss']
})
export class LoginpageDefaultComponent implements OnDestroy, OnInit {


  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  titleName: any = "智能内容管理协作平台"
  isVisible: any = false;
  validmodel: any = {}

  submitting:any = false;

  constructor(fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    public settingsService: SettingsService,
    public menuSrv: MenuService,
    private _message: NzMessageService,
    private cacheService: CacheService,
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    private startupSrv: StartupService,
    private loginServices: loginServices,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.form = fb.group({
      userName: [null || '', [Validators.required, Validators.minLength(1)]],
      password: [null || '', Validators.required],
      captcha: [null || '', Validators.required]
    });

    if (WebConfig.loginTitle) {
      this.titleName = WebConfig.loginTitle
    }
  }

  // region: fields

  get userName() {
    return this.form.controls.userName;
  }

  get password() {
    return this.form.controls.password;
  }

  get captcha() {
    return this.form.controls.captcha;
  }

  // endregion
  cut = true;

  onSwitch() {
    this.cut = !this.cut;
  }

  flag = true;

  switch(ret: any) {
    this.type = ret.index;
    this.flag = this.type === 0;

  }


  submit() {
    if(this.submitting){
      return;
    }
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid) return;
    }

    // if (this.type === 0) {
    //   this.userName.markAsDirty();
    //   this.password.markAsDirty();
    //   //this.captcha.markAsDirty();

    //   if (this.userName.invalid) {
    //     this.error = '请填写用户名';
    //   } else if (this.password.invalid) {
    //     this.error = '请填写密码';
    //   } 
    //   // else if (this.captcha.invalid) {
    //   //   this.error = '请填写验证码';
    //   // } 
    //   else {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //     })
    //   }
    // }
    //登入
    var postData = {
      adminusertel: this.userName.value,
      adminuserpwd: this.password.value
    }
    this.submitting = true;
    this.loginServices.login(postData).subscribe(result => {
      this.submitting = false;
      if (result != null) {
        if (result.data == "") {
          this.msg.error("对不起,找不到用户");
        } else {
          if (result.data.validcode) {
            //弹出框
            this.validmodel = result.data;
            this.isVisible = true;
            return;
          }
          this.storageUserData(result)
        }
      }
    })
  }
  ngOnDestroy(): void {

  }

  ngOnInit(): void {

  }

  uid: UUID;


  cancelValidClick() {
    this.isVisible = false;
    this.validmodel = {}
  }

  saveValidClick() {
    if(this.submitting){
      return;
    }
    this.submitting = true;
    this.loginServices.loginwithcode(this.validmodel).subscribe(result => {
      this.submitting = false;
      if(result && result.data.keycode){
        this.storageUserData(result)
      }
    })
  }

  storageUserData(result) {
    // 清空路由复用信息
    this.reuseTabService.clear();
    var UserObject = {
      name: result.data.adminusernickname,
      leveltype: result.data.leveltype,
      enterprisecode: result.data.enterpriseid,
      keycode: result.data.keycode,
      needpwdchanged:result.data.needpwdchanged
    }
    this.msg.success("登入成功!");
    // 设置用户Token信息
    this.cacheService.set(WebConfig.UserObjectCookie.name, UserObject,
      { type: WebConfig.UserObjectCookie.type, expire: WebConfig.UserObjectCookie.expire })
    // 清空路由复用信息
    this.tokenService.set({
      token: result.data.token ? result.data.token : "NOTOKEN"
    })
    this.reuseTabService.clear();
    // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
    this.startupSrv.load().then(() => this.router.navigate(['/']));
  }
}
