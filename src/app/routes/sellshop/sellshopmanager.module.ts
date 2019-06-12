import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './sellshopmanager.routing';
import { SellshopmanagerMain } from './sellshopmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';
import {
  TProductbrandEditComponent,
  TProductbrandListComponent,
} from './components';

const COMPONENT = [
  TProductbrandEditComponent,
  TProductbrandListComponent,
]
  
//services
import { dataServices } from './services';


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
    SellshopmanagerMain,
    ...COMPONENT,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    ...COMPONENT,
  ]
})
export class SellshopmanagerModule {
  constructor(
   
  ) {
    
  }
}
