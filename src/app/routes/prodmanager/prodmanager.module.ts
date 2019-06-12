import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './prodmanager.routing';
import { ProdManagerMain } from './prodmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';
import {
  TypelistComponent,
  TProductEditComponent,
  TProductListComponent,
  TproductImagesComponent,
  TproductContentComponent,
  TproductunitComponent
  
} from './components';

//services
import { prodServices } from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    SharedModule,
    FileUploadModule
  ],
  declarations: [
    ProdManagerMain,
    TypelistComponent,
    TProductEditComponent,
    TProductListComponent,
    TproductImagesComponent,
    TproductContentComponent,
    TproductunitComponent,
  ],
  providers: [
    prodServices
  ],
  entryComponents: [
    TproductImagesComponent,
    TproductContentComponent,
    TproductunitComponent
  ]
})
export class ProdManagerModule {
  constructor(
   
  ) {
    
  }
}
