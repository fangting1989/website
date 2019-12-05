import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { routing } from './dpcarmanager.routing';
import { DppaimaimanagerMain } from './dppaimaimanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';
 import {
  TWebcoreEditComponent,
  TWebcoreListComponent,
  TMemberEditComponent,
  TMemberListComponent,
  TMemberEditdataComponent,
  TmemberEditmsgComponent,
  HtmbEditComponent,
  GyqyEditComponent,
  JmxzEditComponent,
  TProductEditComponent,
  TProductListComponent,
  TproductImagesComponent,
    TproductContentComponent,
    TproductMsgComponent,
    TSignproductEditComponent,
    TSignproductListComponent,
    TCompactEditComponent,
  TCompactListComponent,
  TcompactMsgComponent,
 } from './components';

//services
import { dataServices } from './services';
import {routes} from './dppaimaimanager.routing';
import { TmemberAddmoneyComponent } from './components/tmember/tmember-addmoney/tmember-addmoney.component';

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
    TWebcoreEditComponent,
    TWebcoreListComponent,
    TMemberEditComponent,
    TMemberListComponent,
    TMemberEditdataComponent,
    DppaimaimanagerMain,
    HtmbEditComponent,
  GyqyEditComponent,
  JmxzEditComponent,
    TProductEditComponent,
    TProductListComponent,
    TproductImagesComponent,
    TproductContentComponent,
    TproductMsgComponent,
    TproductMsgComponent,
    TSignproductEditComponent,
    TSignproductListComponent,
    TmemberAddmoneyComponent,
    TCompactEditComponent,
  TCompactListComponent,
  TcompactMsgComponent,
  TcompactMsgComponent,
  TmemberEditmsgComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    TWebcoreEditComponent,
    TMemberEditComponent,
    TMemberEditdataComponent,
    TproductImagesComponent,
    TproductContentComponent,
    TSignproductEditComponent,
    TmemberAddmoneyComponent,
    TCompactEditComponent,
    TmemberEditmsgComponent,
  ]
})
export class DppaimaimanagerModule {
  constructor(
   
  ) {
    
  }
}
