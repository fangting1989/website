import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './paymanager.routing';
import { PayManagerMain } from './paymanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import {
  PayConfiglistComponent,
  PayconfigeditComponent,
} from './components';

//services
import { payServices } from './services';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    SharedModule
  ],
  declarations: [
    PayManagerMain,
    PayConfiglistComponent,
    PayconfigeditComponent
  ],
  providers: [
    payServices
  ],
  entryComponents: [
    PayconfigeditComponent
  ]
})

export class PayManagerModule {
  constructor() {
    
  }
}
