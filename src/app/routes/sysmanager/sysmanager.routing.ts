import { Routes, RouterModule } from '@angular/router';
import { SysmanagerMain } from './sysmanager.main';
import {
  SyseditComponent,
  ModulemanagerComponent,
  EnumerationComponent,
  TasklistComponent,
  EnterpriselistComponent,
  TLoginLogListComponent,
  EncryptpageComponent,
  EnterpriseConfigComponent
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
      { path: 'enterpriseconfig', component: EnterpriseConfigComponent },
      { path: 'encrypt', component: EncryptpageComponent },
      { path: 'loginlog', component: TLoginLogListComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
