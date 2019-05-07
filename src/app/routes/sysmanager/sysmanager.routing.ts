import { Routes, RouterModule } from '@angular/router';
import { SysmanagerMain } from './sysmanager.main';
import {
  SyseditComponent,
  ModulemanagerComponent,
  EnumerationComponent,
  TasklistComponent,
  EnterpriselistComponent
} from './components';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: SysmanagerMain,
    children: [
      { path: 'sysedit', component: SyseditComponent },
      { path: 'modulemanager', component: ModulemanagerComponent },
      { path: 'enumeration', component: EnumerationComponent },
      { path: 'tasklist', component: TasklistComponent },
      { path: 'enterpriselist', component: EnterpriselistComponent },
      
    ]
  }
];

export const routing = RouterModule.forChild(routes);
