import { Routes, RouterModule } from '@angular/router';
import { UsersysmanagerMain } from './usersysmanager.main';
import {
  UserlistComponent,
  RolelistComponent
} from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: UsersysmanagerMain,
    children: [
      { path: 'userlist', component: UserlistComponent },
      { path: 'rolelist', component: RolelistComponent },
      { path: '**', redirectTo: 'userlist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
