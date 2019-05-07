import { Routes, RouterModule } from '@angular/router';
import { PayManagerMain } from './paymanager.main';
import {
  PayConfiglistComponent
} from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: PayManagerMain,
    children: [
      { path: 'config', component: PayConfiglistComponent },
      { path: '**', redirectTo: 'config' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
