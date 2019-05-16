import { Routes, RouterModule } from '@angular/router';
import { WorkflowmanagerMain } from './workflowmanager.main';

import { WorkflowComponent,
  WorktasklistComponent,
  WorktaskcreateComponent,
   } from './compts';

import {
  AtestComponent,
  BtestComponent,
  ModelsComponent,
  ModelEditComponent,
  ProcesslistComponent,
  ProcessconfigComponent,
  CompDefinedComponent,
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
      { path: 'tasklistcreate', component: WorktaskcreateComponent },
      { path: 'taskworkflow', component: WorkflowComponent },
      { path: 'A', component: AtestComponent },
      { path: 'B', component: BtestComponent },
      { path: '**', redirectTo: 'tasklist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
