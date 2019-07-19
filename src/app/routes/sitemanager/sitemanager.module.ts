import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sitemanager.routing';
import { SitemanagerMain } from './sitemanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';

import {
  TWebcoreEditComponent,
  TWebcoreListComponent,
} from './components';

//services
import { dataServices } from './services';
import { MainpageAdComponent } from './components/twebcore/mainpage-ad/mainpage-ad.component';
import { MainpageTypeComponent } from './components/twebcore/mainpage-type/mainpage-type.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    FileUploadModule,
    SharedModule,
  ],
  declarations: [
    SitemanagerMain,
    TWebcoreEditComponent,
    TWebcoreListComponent,
    MainpageAdComponent,
    MainpageTypeComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    TWebcoreEditComponent,
    MainpageAdComponent,
    MainpageTypeComponent
  ]
})
export class SitemanagerModule {
  constructor(
   
  ) {
    
  }
}
