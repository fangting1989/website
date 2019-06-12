import { Routes, RouterModule } from '@angular/router';
import { ProdManagerMain } from './prodmanager.main';
import {
  TypelistComponent,
  TProductListComponent,
  TProductEditComponent,
} from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ProdManagerMain,
    children: [ 
      { path: 'type', component: TypelistComponent },
      { path: 'tproductlist', component: TProductListComponent },
      { path: 'tproductedit', component: TProductEditComponent },
      { path: '**', redirectTo: 'prodlist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
