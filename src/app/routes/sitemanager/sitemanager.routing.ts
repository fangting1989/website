import { Routes, RouterModule } from '@angular/router';
import { SitemanagerMain } from './sitemanager.main';
import {
  TWebcoreListComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: SitemanagerMain,
    children: [
      { path: 'twebcore', component: TWebcoreListComponent },
      { path: '**', redirectTo: 'twebcore' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
