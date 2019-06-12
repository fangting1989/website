import { Routes, RouterModule } from '@angular/router';
import { SellshopmanagerMain } from './sellshopmanager.main';
import {
  TProductbrandListComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: SellshopmanagerMain,
    children: [
      { path: 'tproductbrandlist', component: TProductbrandListComponent },
      { path: '**', redirectTo: 'tproductbrandlist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
