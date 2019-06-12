import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sysmanager.routing';
import { SysmanagerMain } from './sysmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import {
  SyseditComponent,
  ModulemanagerComponent,
  EnumerationComponent,
  EnumvalueEditComponent,
  TasklistComponent,
  TestdemoComponent,
  EnterpriselistComponent,
  EnterpriseEditComponent,
  EnterprisePassportComponent,
  SelEnterpriseComponent,
  TLoginLogListComponent,
  EnterpriseDashboardComponent
} from './components';

//services
import { sysmanagerServices } from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    SharedModule
  ],
  declarations: [
    SysmanagerMain,
    SyseditComponent,
    ModulemanagerComponent,
    EnumerationComponent,
    TasklistComponent,
    TestdemoComponent,
    EnterpriselistComponent,
    EnterpriseEditComponent,
    EnumvalueEditComponent,
    EnterprisePassportComponent,
    SelEnterpriseComponent,
    TLoginLogListComponent,
    EnterpriseDashboardComponent
  ],
  providers: [
    sysmanagerServices
  ],
  entryComponents: [
    TestdemoComponent,
    EnterpriseEditComponent,
    EnumvalueEditComponent,
    EnterprisePassportComponent,
    SelEnterpriseComponent,
    EnterpriseDashboardComponent
  ]
})
export class SysmanagerModule {
  constructor(
   
  ) {
    
  }
}
