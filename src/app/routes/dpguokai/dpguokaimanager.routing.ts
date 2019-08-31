import { Routes, RouterModule } from '@angular/router';
import { DpguokaimanagerMain } from './dpguokaimanager.main';
import {
  TWebcoreListComponent,
  TMemberListComponent,
  ZxpxEditComponent,
  GytxEditComponent,
  GyfxEditComponent,
} from './components';

export const routes: Routes = [
  {
    path: '',
    component: DpguokaimanagerMain,
    children: [
      // { path: 'action', component: TActionListComponent },
      // { path: 'hhrpage', component: HhrpageComponent },
      // { path:'wechatrole',component:WechatroleComponent},
      // { path:'bzj',component:BzjPageComponent},
      { path: 'twebcorelist', component: TWebcoreListComponent },
      { path: 'tmemberlist', component: TMemberListComponent },
      { path: 'zxpx', component: ZxpxEditComponent },
      { path: 'gytx', component: GytxEditComponent },
      { path: 'gyfx', component: GyfxEditComponent },
      { path: '**', redirectTo: 'twebcorelist' },
    ]
  }
];

// export const routes;
// export const routing = RouterModule.forChild(routes);
