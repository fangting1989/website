import { Routes, RouterModule } from '@angular/router';
import { DppaimaimanagerMain } from './dppaimaimanager.main';
import {
  TWebcoreListComponent,
  TMemberListComponent,
  TMemberEditComponent,
  HtmbEditComponent,
  GyqyEditComponent,
  JmxzEditComponent,
  TProductListComponent,
  TProductEditComponent,
} from './components';

export const routes: Routes = [
  {
    path: '',
    component: DppaimaimanagerMain,
    children: [
      // { path: 'action', component: TActionListComponent },
      // { path: 'hhrpage', component: HhrpageComponent },
      // { path:'wechatrole',component:WechatroleComponent},
      // { path:'bzj',component:BzjPageComponent}, 
      { path: 'twebcorelist', component: TWebcoreListComponent },
      { path: 'tmemberlist', component: TMemberListComponent },
      { path: 'tmemberedit', component: TMemberEditComponent },
      { path: 'htmb', component: HtmbEditComponent },
      { path: 'gyqy', component: GyqyEditComponent },
      { path: 'jmxz', component: JmxzEditComponent },
      { path: 'tproductlist', component: TProductListComponent },
      { path: 'tproductedit', component: TProductEditComponent },
      { path: '**', redirectTo: 'twebcorelist' },
    ]
  }
];

// export const routes;
// export const routing = RouterModule.forChild(routes);
