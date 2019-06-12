import { Routes, RouterModule } from '@angular/router';
import { CustommanagerMain } from './custommanager.main';
import {
  TCustomerListComponent,
  AlllistComponent,
  FxcustomlistComponent,
  ComcustomlistComponent,
  HhrapplyComponent,
  JlapprovedComponent,
  ZxapprovedComponent,
  PsysapprovedComponent,
  PszsapprovedComponent,
  ZsapprovedComponent,
  FgsapprovedComponent,
  JtzsapprovedComponent,
  DskComponent,
  DdkComponent,
TActionListComponent,
  HhrpageComponent,
  TgyComponent,

  ApplyprogressComponent,
    HhrpassComponent,
    HhrunpassComponent,
    ProfpComponent,
    PreapprovedComponent,
    ApprovedlogComponent,
    ProcessingComponent,
    ZxapprovedlogComponent,
    PsysprocessingComponent,
    PsysapprovedlogComponent,
    PszsprocessingComponent,
    PszsapprovedlogComponent,

    ZspreapprovedComponent,
    ZspretxComponent,
    ZspretxlogComponent,
    FgspreapprovedComponent,
    FgspretxComponent,
    FgstxlogComponent,
    JtzpreapprovedComponent,
    JtzpretxComponent,
    JtztxlogComponent,
    DdkpageComponent,
    DdklogpageComponent,
    DskpageComponent,
    DsklogpageComponent,
    WechatroleComponent,
    BzjPageComponent,
    ZcshComponent,
    ZcshapprovedlogComponent,
    ZcshprocessingComponent,
    PsyspreComponent,
    PsyspreapprovedlogComponent,
    PsyspreprocessingComponent,
} from './components';

const routes: Routes = [
  {
    path: '',
    component: CustommanagerMain,
    children: [
      {
        path: 'allcustomerlist',
        component: AlllistComponent,
        children: [
          { path: 'customerlist', component: TCustomerListComponent },
          { path: 'fxcustomerlist', component: FxcustomlistComponent },
          { path: '**', redirectTo: 'customerlist' },
        ],
      },
      { path: 'comcustomerlist', component: ComcustomlistComponent },
      { path: 'tgy', component: TgyComponent },
      { 
        path: 'hhrapply', 
        component: HhrapplyComponent,
        children: [
          { path: 'applyprogress', component: ApplyprogressComponent },
          { path: 'hrrpass', component: HhrpassComponent },
          { path: 'hrrunpass', component: HhrunpassComponent },
          { path: '**', redirectTo: 'applyprogress' },
        ], 
      },
      {
        path: 'zcsh', 
        component: ZcshComponent,
        children: [
          { path: 'processing', component: ZcshprocessingComponent },
          { path: 'approvedlog', component:ZcshapprovedlogComponent },
          { path: '**', redirectTo: 'processing' },
        ], 
        
      },
      { 
        path: 'jlapproved', 
        component: JlapprovedComponent,
        children: [
          { path: 'profp', component: ProfpComponent },
          { path: 'preapproved', component: PreapprovedComponent },
          { path: 'approvedlog', component: ApprovedlogComponent },
          { path: '**', redirectTo: 'profp' },
        ], 
      },
      { 
        path: 'zxapproved', 
        component: ZxapprovedComponent,
        children: [
          { path: 'processing', component: ProcessingComponent },
          { path: 'zxapprovedlog', component: ZxapprovedlogComponent },
          { path: '**', redirectTo: 'processing' },
        ], 
      },
      { 
        path: 'psyspre', 
        component: PsyspreComponent,
        children: [
          { path: 'psyspreprocessing', component: PsyspreprocessingComponent },
          { path: 'psyspreapprovedlog', component: PsyspreapprovedlogComponent },
          { path: '**', redirectTo: 'psyspreprocessing' },
        ], 
      },
      { 
        path: 'psysapproved', 
        component: PsysapprovedComponent,
        children: [
          { path: 'psysprocessing', component: PsysprocessingComponent },
          { path: 'psysapprovedlog', component: PsysapprovedlogComponent },
          { path: '**', redirectTo: 'psysprocessing' },
        ], 
      },
      { 
        path: 'pszsapproved', 
        component: PszsapprovedComponent,
        children: [
          { path: 'pszsprocessing', component: PszsprocessingComponent },
          { path: 'pszsapprovedlog', component: PszsapprovedlogComponent },
          { path: '**', redirectTo: 'pszsprocessing' },
        ], 
      },
      //提现
      { 
        path: 'zsapproved', 
        component: ZsapprovedComponent,
        children: [
          { path: 'zspreapproved', component: ZspreapprovedComponent },
          { path: 'zspretx', component: ZspretxComponent },
          { path: 'zspretxlog', component: ZspretxlogComponent },
          { path: '**', redirectTo: 'zspreapproved' },
        ], 
      },
      { 
        path: 'fgsapproved', 
        component: FgsapprovedComponent,
        children: [
          { path: 'fgspreapproved', component: FgspreapprovedComponent },
          { path: 'fgspretx', component: FgspretxComponent },
          { path: 'fgstxlog', component: FgstxlogComponent },
          { path: '**', redirectTo: 'fgspreapproved' },
        ], 
      },
      { 
        path: 'jtzsapproved', 
        component: JtzsapprovedComponent,
        children: [
          { path: 'jtzpreapproved', component: JtzpreapprovedComponent },
          { path: 'jtzpretx', component: JtzpretxComponent },
          { path: 'jtztxlog', component: JtztxlogComponent },
          { path: '**', redirectTo: 'jtzpreapproved' },
        ], 
      },
      //财务,
      { 
        path: 'dsk', 
        component: DskComponent,
        children: [
          { path: 'dskpage', component: DskpageComponent },
          { path: 'dsklogpage', component: DsklogpageComponent },
          { path: '**', redirectTo: 'dskpage' },
        ], 
      },
      { 
        path: 'ddk', 
        component: DdkComponent,
        children: [
          { path: 'ddkpage', component: DdkpageComponent },
          { path: 'ddklogpage', component: DdklogpageComponent },
          { path: '**', redirectTo: 'ddkpage' },
        ], 
      },
      { path: 'action', component: TActionListComponent },
      { path: 'hhrpage', component: HhrpageComponent },
      { path:'wechatrole',component:WechatroleComponent},
      { path:'bzj',component:BzjPageComponent},
      { path: '**', redirectTo: 'allcustomerlist' },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
