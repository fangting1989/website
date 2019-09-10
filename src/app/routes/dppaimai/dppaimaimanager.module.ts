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
  HtmbEditComponent,
  GyqyEditComponent,
  JmxzEditComponent,
  TProductEditComponent,
  TProductListComponent,
  TproductImagesComponent,
    TproductContentComponent,
 } from './components';

//services
import { dataServices } from './services';
import {routes} from './dppaimaimanager.routing';

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
  ]
})
export class DppaimaimanagerModule {
  constructor(
   
  ) {
    
  }
}
