import { Routes, RouterModule } from '@angular/router';
import { DpcarmanagerMain } from './dpcarmanager.main';
import {
  LoanCreditResultListComponent,
  LoanOrderListComponent,
  LoanOrderProcessListComponent,
} from './components';

export const routes: Routes = [
  {
    path: 'dpcar',
    component: DpcarmanagerMain,
    children: [
      // { path: 'action', component: TActionListComponent },
      // { path: 'hhrpage', component: HhrpageComponent },
      // { path:'wechatrole',component:WechatroleComponent},
      // { path:'bzj',component:BzjPageComponent},
      { path: 'loancreditresultlist', component: LoanCreditResultListComponent },
      { path: 'loanorderlist', component: LoanOrderListComponent },
      { path: 'loanorderprocesslist', component: LoanOrderProcessListComponent },
      { path: '**', redirectTo: 'loancreditresultlist' },
    ]
  }
];

// export const routes;
// export const routing = RouterModule.forChild(routes);
