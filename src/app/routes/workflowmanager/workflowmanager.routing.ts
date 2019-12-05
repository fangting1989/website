import { Routes, RouterModule } from '@angular/router';
import { WorkflowmanagerMain } from './workflowmanager.main';

import { WorkflowComponent,
  WorktasklistComponent,
  WorktaskcreateComponent,
  WorkcartasklistComponent,
  CartaskcreateComponent,
   } from './compts';

import {
  ModelsComponent,
  ModelEditComponent,
  ProcesslistComponent,
  ProcessconfigComponent,
  CompDefinedComponent,
  TWorkflowroleListComponent,
  ProcessProwerprocessComponent,
  TProcessenterpriseListComponent,
  
} from './components';

const routes: Routes = [
  {
    path: '',
    component: WorkflowmanagerMain,
    children: [
      { path: 'modellist', component: ModelsComponent },
      { path: 'modeledit', component: ModelEditComponent },
      { path: 'processlist', component: ProcesslistComponent },
      { path: 'processconfig', component: ProcessconfigComponent },
      { path: 'compdefined', component: CompDefinedComponent },
      { path: 'tasklist', component: WorktasklistComponent },
      { path: 'cartasklist', component: WorkcartasklistComponent },
      { path: 'cartaskcreate', component: CartaskcreateComponent },
      { path: 'tasklistcreate', component: WorktaskcreateComponent },
      { path: 'taskworkflow', component: WorkflowComponent },
      { path: 'workflowrole', component: TWorkflowroleListComponent },
      { path:'prowerprocess',component:ProcessProwerprocessComponent},
      { path: 'processenterpriselist', component: TProcessenterpriseListComponent },
      { path: '**', redirectTo: 'tasklist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
