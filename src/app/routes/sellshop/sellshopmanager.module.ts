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
  TRefuseEditComponent,
  TRefuseListComponent,
  TOrderEditComponent,
TOrderListComponent,
OrderExpressComponent,
TMemberEditComponent,
TMemberListComponent,
TProrejectedEditComponent,
TProrejectedListComponent,
TradestaticComponent,
ProductstaticComponent,
MemberstaticComponent,
TExpressEditComponent,
TExpressListComponent,
} from './components';

const COMPONENT = [
  TProductbrandEditComponent,
  TProductbrandListComponent,
  TRefuseEditComponent,
  TRefuseListComponent,
  TOrderEditComponent,
TOrderListComponent,
OrderExpressComponent,
TMemberEditComponent,
TMemberListComponent,
TProrejectedEditComponent,
TProrejectedListComponent,
TradestaticComponent,
ProductstaticComponent,
MemberstaticComponent,
TExpressEditComponent,
TExpressListComponent,
]

//services
import { dataServices } from './services';
import { OrderSendComponent } from './components/torder/order-send/order-send.component';


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
    OrderSendComponent,
    OrderExpressComponent,
    TradestaticComponent,
    ProductstaticComponent,
    MemberstaticComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    OrderSendComponent,
    ...COMPONENT,
  ]
})
export class SellshopmanagerModule {
  constructor(

  ) {

  }
}
