import { Routes, RouterModule } from '@angular/router';
import { DpcarmanagerMain } from './dpcarmanager.main';
import {
  TBankListComponent,
  TCarbrandListComponent,
  TCardealerListComponent,
  TRegionListComponent,
  TRegionEditComponent,
  TCardealerEditComponent,
  CustomerlistComponent,
  CustomerMsgComponent,
} from './components';


export const routes: Routes = [
  {
    path: '', //业务组件
    component: DpcarmanagerMain,
    children: [
      { path: 'tbanklist', component: TBankListComponent },
      { path: 'tcarbrandlist', component: TCarbrandListComponent },
      { path: 'tcardealeredit', component: TCardealerEditComponent },
      { path: 'tcardealerlist', component: TCardealerListComponent },
      { path: 'tregionlist', component: TRegionListComponent },
      { path: 'tregionedit', component: TRegionEditComponent },
      { path: 'customerlist', component: CustomerlistComponent },
      { path: 'customermsg', component: CustomerMsgComponent },
      { path: '**', redirectTo: 'tbanklist' },
    ]
  }
];

// export const routes;
// export const routing = RouterModule.forChild(routes);
