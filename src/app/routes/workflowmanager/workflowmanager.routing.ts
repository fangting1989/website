import { Routes, RouterModule } from '@angular/router';
import { WorkflowmanagerMain } from './workflowmanager.main';

import { WorkflowComponent,
  WorktasklistComponent } from './compts';

import {
  AtestComponent,
  BtestComponent,
  ModelsComponent,
  ModelEditComponent,
  ProcesslistComponent
} from './components';

const routes: Routes = [
  {
    path: '',
    component: WorkflowmanagerMain,
    children: [
      { path: 'modellist', component: ModelsComponent },
      { path: 'modeledit', component: ModelEditComponent },
      { path: 'processlist', component: ProcesslistComponent },
      { path: 'tasklist', component: WorktasklistComponent },
      { path: 'A', component: AtestComponent },
      { path: 'B', component: BtestComponent },
      { path: '**', redirectTo: 'tasklist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
