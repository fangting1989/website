import { Routes, RouterModule } from '@angular/router';
import { SellshopmanagerMain } from './sellshopmanager.main';
import {
  TProductbrandListComponent,
  TRefuseListComponent,
  TOrderListComponent,
  TOrderEditComponent,
  TMemberListComponent,
  TMemberEditComponent,
  TProrejectedListComponent,
  TradestaticComponent,
ProductstaticComponent,
MemberstaticComponent,
TExpressListComponent,
TOrderdetailCommentListComponent,
OrderBillComponent,
TmemberApprovedComponent,
RelategwsComponent,
GwsorderListComponent,
TAdviceListComponent,
TTagListComponent,
TOperatelogListComponent,
ImportdataComponent,
ImportupdatebynameComponent,
ImportupdatebycodeComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: SellshopmanagerMain,
    children: [
      { path: 'tproductbrandlist', component: TProductbrandListComponent },
      { path: 'trefuselist', component: TRefuseListComponent },
      { path: 'torderlist', component: TOrderListComponent },
      { path: 'torderedit', component:TOrderEditComponent },
      { path: 'tmemberlist', component: TMemberListComponent },
      { path: 'tmemberedit', component: TMemberEditComponent },
      { path: 'tprorejectedlist', component: TProrejectedListComponent },
      { path: 'tradestatic', component: TradestaticComponent },
      { path: 'productstatic', component: ProductstaticComponent },
      { path: 'memberstatic', component: MemberstaticComponent },
      { path: 'texpresslist', component: TExpressListComponent },
      { path: 'tcomment', component: TOrderdetailCommentListComponent },
      { path: 'torderbill', component: OrderBillComponent },
      { path: 'tmemberapproved', component: TmemberApprovedComponent },
      {path: 'gwsoderlist', component: GwsorderListComponent  },
      {path: 'rtgws', component: RelategwsComponent  },
      { path: 'tadvicelist', component: TAdviceListComponent },
      { path: 'ttaglist', component: TTagListComponent },
      { path: 'toperateloglist', component: TOperatelogListComponent },
      { path: 'importdata', component: ImportdataComponent },
      { path: 'importupdatebyname', component: ImportupdatebynameComponent },
      { path: 'importupdatebycode', component: ImportupdatebycodeComponent },
      { path: '**', redirectTo: 'tproductbrandlist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
