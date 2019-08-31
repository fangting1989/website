import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// import { routing } from './dpcarmanager.routing';
import { DpguokaimanagerMain } from './dpguokaimanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';
 import {
  TWebcoreEditComponent,
TWebcoreListComponent,
TMemberEditComponent,
TMemberListComponent,
ZxpxEditComponent,
GytxEditComponent,
GyfxEditComponent,
 } from './components';

//services
import { dataServices } from './services';
import {routes} from './dpguokaimanager.routing';

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
    DpguokaimanagerMain,
    ZxpxEditComponent,
    GytxEditComponent,
    GyfxEditComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    TWebcoreEditComponent,
    TMemberEditComponent
  ]
})
export class DpguokaimanagerModule {
  constructor(
   
  ) {
    
  }
}
