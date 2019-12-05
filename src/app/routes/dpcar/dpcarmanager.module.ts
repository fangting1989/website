import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { routing } from './dpcarmanager.routing';
import { DpcarmanagerMain } from './dpcarmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';
import {
  TBankEditComponent,
  TBankListComponent,
  TCarbrandEditComponent,
  TCarbrandListComponent,
  TCardealerEditComponent,
  TCardealerListComponent,
  TRegionEditComponent,
  TRegionListComponent,
  CustomerlistComponent,
  CustomerMsgComponent,
} from './components';

//services
import { dataServices } from './services';
import {routes} from './dpcarmanager.routing';

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
    TBankEditComponent,
    TBankListComponent,
    TCarbrandEditComponent,
    TCarbrandListComponent,
    TCardealerEditComponent,
    TCardealerListComponent,
    DpcarmanagerMain,
    TRegionEditComponent,
    TRegionListComponent,
    CustomerlistComponent,
    CustomerMsgComponent,
    CustomerMsgComponent,
  ],
  exports:[
    
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    TBankEditComponent,
    TCarbrandEditComponent,
    TCardealerEditComponent,
    TRegionEditComponent,
  ]
})
export class DpcarmanagerModule {
  constructor(
   
  ) {
    
  }
}
