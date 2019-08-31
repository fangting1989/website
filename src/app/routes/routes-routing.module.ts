import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { AuthGuard } from './auth-guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' ,canActivate: [AuthGuard] },
      { path: 'sysmanager', loadChildren: './sysmanager/sysmanager.module#SysmanagerModule',canActivate: [AuthGuard]},
      { path: 'usersysmanager', loadChildren: './usersysmanager/usersysmanager.module#UserSysmanagerModule' ,canActivate: [AuthGuard]},
      { path: 'prodmanager', loadChildren: './prodmanager/prodmanager.module#ProdManagerModule' ,canActivate: [AuthGuard]},
      { path: 'payment', loadChildren: './paymanager/paymanager.module#PayManagerModule' ,canActivate: [AuthGuard]},
      { path: 'sitemanager', loadChildren: './sitemanager/sitemanager.module#SitemanagerModule' ,canActivate: [AuthGuard]},
      { path: 'custommanager', loadChildren: './dp/custommanager/custommanager.module#CustommanagerModule' ,canActivate: [AuthGuard],canActivateChild: [AuthGuard]},
      { path: 'workflow', loadChildren: './workflowmanager/workflowmanager.module#WorkflowManagerModule' ,canActivate: [AuthGuard]},
      { path: 'sellshop', loadChildren: './sellshop/sellshopmanager.module#SellshopmanagerModule' ,canActivate: [AuthGuard]},
      { path: 'dpguokai', loadChildren: './dpguokai/dpguokaimanager.module#DpguokaimanagerModule' ,canActivate: [AuthGuard]},
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
    ]
  },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
