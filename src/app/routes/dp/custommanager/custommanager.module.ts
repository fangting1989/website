import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './custommanager.routing';
import { CustommanagerMain } from './custommanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { FileUploadModule } from 'ng2-file-upload';
import {
  TCustomerEditComponent,
  TCustomerListComponent,
  AlllistComponent,
  FxcustomlistComponent,
  ComcustomlistComponent,
  HhrapplyComponent,
    JlapprovedComponent,
    FpproinstComponent,
    ZxapprovedComponent,
    PsysapprovedComponent,
    PszsapprovedComponent,
    ZsapprovedComponent,
    FgsapprovedComponent,
    JtzsapprovedComponent,
    DskComponent,
    DdkComponent,
    TActionEditComponent,
TActionListComponent,
    HhrpageComponent,
    HhrEditComponent,
    TgyComponent,
    
    ApplyprogressComponent,
    HhrpassComponent,
    HhrunpassComponent,
    HhrComtinueeditComponent,
    ProfpComponent,
    PreapprovedComponent,
    ApprovedlogComponent,
    ProcessingComponent,
    ZxapprovedlogComponent,
    ZxEditComponent,

    PsysprocessingComponent,
    PsysapprovedlogComponent,
    PszsprocessingComponent,
    PszsapprovedlogComponent,

    ZspreapprovedComponent,
    ZspretxComponent,
    ZspretxlogComponent,
    FgspreapprovedComponent,
    FgspretxComponent,
    FgstxlogComponent,
    JtzpreapprovedComponent,
    JtzpretxComponent,
    JtztxlogComponent,
    DdkpageComponent,
    DdklogpageComponent,
    DskpageComponent,
    DsklogpageComponent,
    TurnbackComponent,
    WechatroleComponent,
    BzjPageComponent,
    ApprovedZcshComponent,
    ZcshapprovedlogComponent,
    ZcshprocessingComponent,
    ZcshComponent,
    PsyspreComponent,
    ApprovedPsyspreComponent,
    PsyspreapprovedlogComponent,
    PsyspreprocessingComponent,
} from './components';

//services
import { dataServices } from './services';
import { CustomerReadComponent } from './components/tcustomer/customer-read/customer-read.component';
import { DskImagesComponent } from './components/cwmanager/dsk/dsk-images/dsk-images.component';
import { ZxImagesComponent } from './components/approved/zx/zx-images/zx-images.component';
import { ZxPsbgComponent } from './components/approved/zx/zx-psbg/zx-psbg.component';
import { PsbgSpComponent } from './components/approved/jl/psbg-sp/psbg-sp.component';
import { ApprovedZsysComponent } from './components/approved/psys/approved-zsys/approved-zsys.component';
import { ApprovedPszsComponent } from './components/approved/pszs/approved-pszs/approved-pszs.component';
import { MaterialEditComponent } from './components/approved/zx/material-edit/material-edit.component';
import { ZcEditComponent } from './components/approved/hhr/zc-edit/zc-edit.component';
import { BackadviceComponent } from './components/approved/common/backadvice/backadvice.component';
import { ProinstapprovedComponent } from './components/approved/common/proinstapproved/proinstapproved.component';
import { TpartnerReadComponent } from './components/approved/common/tpartner-read/tpartner-read.component';
import { UploadImagesComponent } from './components/approved/common/upload-images/upload-images.component';
import { MaterialUploadImagesComponent } from './components/approved/common/material-upload-images/material-upload-images.component';
import { PsbgReadComponent } from './components/approved/common/psbg-read/psbg-read.component';
import { BcclZxjgComponent } from './components/approved/common/bccl-zxjg/bccl-zxjg.component';
import { PartnerworkEditComponent } from './components/approved/common/partnerwork-edit/partnerwork-edit.component';
import { WechatroleuserlistComponent } from './components/wechatmanger/wechatroleuserlist/wechatroleuserlist.component';
import { HhrAchivedComponent } from './components/approved/common/hhr-achived/hhr-achived.component';
import { UploadPzComponent } from './components/cwmanager/bzj-page/upload-pz/upload-pz.component';
import { NeedmoneyPzComponent } from './components/cwmanager/bzj-page/needmoney-pz/needmoney-pz.component';
import { OutmoneydetailComponent } from './components/txmanager/common/outmoneydetail/outmoneydetail.component';
import { TxDetailComponent } from './components/txmanager/common/tx-detail/tx-detail.component';
import { DdkImagesUploadComponent } from './components/cwmanager/ddk-images-upload/ddk-images-upload.component';
import { PartnerMoneyComponent } from './components/approved/common/partner-money/partner-money.component';
import { HrrgkComponent } from './components/hhrmanager/hrrgk/hrrgk.component';
import { DpComponentImageComponent } from './components/common/dp-component-image/dp-component-image.component';
import { EditBankcardComponent } from './components/approved/common/partner-money/edit-bankcard/edit-bankcard.component';
import { ShareCustomlistComponent } from './components/tcustomer/share-customlist/share-customlist.component';
import { EditBzjComponent } from './components/approved/common/partner-money/edit-bzj/edit-bzj.component';


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
    CustommanagerMain,
    TCustomerEditComponent,
    TCustomerListComponent,
    AlllistComponent,
    FxcustomlistComponent,
    HhrapplyComponent,
    JlapprovedComponent,
    ZxapprovedComponent,
    PsysapprovedComponent,
    PszsapprovedComponent,
    ZsapprovedComponent,
    FgsapprovedComponent,
    JtzsapprovedComponent,
    DskComponent,
    DdkComponent,
    TActionEditComponent,
TActionListComponent,
    HhrpageComponent,
    TgyComponent,
    //
    ApplyprogressComponent,
    HhrpassComponent,
    HhrunpassComponent,
    ProfpComponent,
    PreapprovedComponent,
    ApprovedlogComponent,
    ProcessingComponent,
    ZxapprovedlogComponent,
    PsysprocessingComponent,
    PsysapprovedlogComponent,
    PszsprocessingComponent,
    PszsapprovedlogComponent,

    ZspreapprovedComponent,
    ZspretxComponent,
    ZspretxlogComponent,
    FgspreapprovedComponent,
    FgspretxComponent,
    FgstxlogComponent,
    JtzpreapprovedComponent,
    JtzpretxComponent,
    JtztxlogComponent,
    DdkpageComponent,
    DdklogpageComponent,
    DskpageComponent,
    DsklogpageComponent,
    CustomerReadComponent,
    ComcustomlistComponent,
    HhrEditComponent,
    HhrComtinueeditComponent,
    FpproinstComponent,
    ZxEditComponent,
    DskImagesComponent,
    ZxImagesComponent,
    ZxPsbgComponent,
    PsbgSpComponent,
    ApprovedZsysComponent,
    ApprovedPszsComponent,
    MaterialEditComponent,
    ZcEditComponent,
    TurnbackComponent,
    BackadviceComponent,
    ProinstapprovedComponent,
    TpartnerReadComponent,
    UploadImagesComponent,
    MaterialUploadImagesComponent,
    PsbgReadComponent,
    BcclZxjgComponent,
    PartnerworkEditComponent,
    WechatroleComponent,
    WechatroleuserlistComponent,
    BzjPageComponent,
    HhrAchivedComponent,
    UploadPzComponent,
    NeedmoneyPzComponent,
    OutmoneydetailComponent,
    TxDetailComponent,
    DdkImagesUploadComponent,
    PartnerMoneyComponent,
    HrrgkComponent,
    DpComponentImageComponent,
    EditBankcardComponent,
    ApprovedZcshComponent,
    ZcshapprovedlogComponent,
    ZcshprocessingComponent,
    ZcshComponent,
    PsyspreComponent,
    ApprovedPsyspreComponent,
    PsyspreapprovedlogComponent,
    PsyspreprocessingComponent,
    ShareCustomlistComponent,
    EditBzjComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    TCustomerEditComponent,
    TActionEditComponent,
    CustomerReadComponent,
    HhrEditComponent,
    HhrComtinueeditComponent,
    FpproinstComponent,
    ZxEditComponent,
    DskImagesComponent,
    ZxImagesComponent,
    ZxPsbgComponent,
    PsbgSpComponent,
    ApprovedZsysComponent,
    ApprovedPszsComponent,
    TurnbackComponent,
    ZcEditComponent,
    MaterialEditComponent,
    MaterialUploadImagesComponent,
    PartnerworkEditComponent,
    WechatroleuserlistComponent,
    HhrAchivedComponent,
    UploadPzComponent,
    NeedmoneyPzComponent,
    TxDetailComponent,
    DdkImagesUploadComponent,
    DpComponentImageComponent,
    EditBankcardComponent,
    ApprovedZcshComponent,
    ApprovedPsyspreComponent,
    EditBzjComponent
  ]
})
export class CustommanagerModule {
  constructor(
   
  ) {
    
  }
}
