import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './login.routing';
import {loginServices} from './services';
import { LoginpageComponent } from './components'
import { SharedModule } from '@shared/shared.module';
import { LoginpageDefaultComponent } from './components/loginpage-default/loginpage-default.component';
import { LoginmainComponent } from './components/loginmain/loginmain.component';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    routing,
  ],
  declarations: [
    LoginpageComponent,
    LoginpageDefaultComponent,
    LoginmainComponent
  ],
  providers:[
    loginServices
  ]
})
export class LoginModule {}
