import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './usersysmanager.routing';
import { UsersysmanagerMain } from './usersysmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import {
  UserlistComponent,
  RolelistComponent,
  ProwermoduleComponent, 
} from './components';


//services
import { usersysmanagerServices } from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    SharedModule
  ],
  declarations: [
    UsersysmanagerMain,
    UserlistComponent,
    RolelistComponent,
    ProwermoduleComponent,
  ],
  providers: [
    usersysmanagerServices
  ],
  entryComponents: [
    ProwermoduleComponent
  ]
})
export class UserSysmanagerModule {
  constructor(
   
  ) {
    
  }
}
