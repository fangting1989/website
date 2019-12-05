import { Routes, RouterModule } from '@angular/router';
import { DpcarworkflowMain } from './dpcarworkflow.main';


export const routes: Routes = [
  {
    path: 'dpcarworkflow', //业务组件
    component: DpcarworkflowMain,
    children: [
      { path: '**', redirectTo: 'loancreditresultlist' },
    ]
  }
];

