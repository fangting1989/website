import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sitemanager.routing';
import { SitemanagerMain } from './sitemanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import {
  TWebcoreEditComponent,
  TWebcoreListComponent,
} from './components';

//services
import { dataServices } from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    SharedModule
  ],
  declarations: [
    SitemanagerMain,
    TWebcoreEditComponent,
    TWebcoreListComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    TWebcoreEditComponent
  ]
})
export class SitemanagerModule {
  constructor(
   
  ) {
    
  }
}
