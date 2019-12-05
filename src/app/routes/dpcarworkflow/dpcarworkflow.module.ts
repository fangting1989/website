import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DpcarworkflowMain } from './dpcarworkflow.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';

import {
  MaterialSaveComponent,
  MaterialImagebaseComponent,
  LoanpersonbaseComponent,
  BaseEmergentpersonComponent,
} from './basecomponents'

const BaseComponents = [
  MaterialSaveComponent,
  MaterialImagebaseComponent,
  LoanpersonbaseComponent,
  BaseEmergentpersonComponent
]
import {
  TCustomerEditComponent,
  ProinstCreateComponent,
  ZxCustomerMsgComponent,
  ZxCustomerMaterialComponent,
  MaterialUploadComponent,
  AccesscarComponent,

  LoancarComponent,
  LoanstageComponent,
  LoanotherComponent,
  LoanpersonComponent,
  LoanpersonGtComponent,
  LoanemergentpersonComponent,

  LoanClscmaterialComponent,
  LoanClscsignvideoComponent,
  LoanClscmaterialotherComponent,
  LoanDkclMaterialpersonComponent,
  LoanDkclMaterialenterpriseComponent,
  LoanDkclMaterialotherComponent,
  LoanSmclMaterialComponent,
  LoanSmclMaterialotherComponent,
  LoancardComponent,
  LoancardotherComponent,
  LoancardEmergentpersonComponent,
  LiftingcarComponent,
  LiftingcarMaterialComponent,
  LiftingcarMaterialotherComponent,
} from './components';

const Components = [
  TCustomerEditComponent,
  ProinstCreateComponent,
  ZxCustomerMsgComponent,
  ZxCustomerMaterialComponent,
  MaterialUploadComponent,
  AccesscarComponent,
  LoancarComponent,
  LoanstageComponent,
  LoanotherComponent,
  LoanpersonComponent,
  LoanpersonGtComponent,
  LoanemergentpersonComponent,
  LoanClscmaterialComponent,
  LoanClscsignvideoComponent,
  LoanClscmaterialotherComponent,
  LoanDkclMaterialpersonComponent,
  LoanDkclMaterialenterpriseComponent,
  LoanDkclMaterialotherComponent,
  LoanSmclMaterialComponent,
  LoanSmclMaterialotherComponent,
  LoancardComponent,
  LoancardotherComponent,
  LoancardEmergentpersonComponent,
  LiftingcarComponent,
  LiftingcarMaterialComponent,
  LiftingcarMaterialotherComponent,
]

//services
import { dataServices,proinstServices } from './services';
import {routes} from './dpcarworkflow.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    // routing,
    AngularSplitModule,
    FileUploadModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ 
    DpcarworkflowMain,
    ...BaseComponents,
    ...Components,
    LiftingcarComponent,
    LiftingcarMaterialComponent,
    LiftingcarMaterialotherComponent,
  ],
  exports:[
    ProinstCreateComponent,
    ZxCustomerMsgComponent,
    ZxCustomerMaterialComponent,
  ],
  providers: [
    dataServices,
    proinstServices
  ],
  entryComponents: [
    ...BaseComponents,
    ...Components
  ]
})
export class DpcarworkflowModule {
  constructor(
   
  ) {
    
  }
}
