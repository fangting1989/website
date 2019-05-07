import { Routes, RouterModule }  from '@angular/router';

import { LoginpageComponent,LoginmainComponent } from './components'
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: LoginmainComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
