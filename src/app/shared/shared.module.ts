import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { AlainThemeModule } from '@delon/theme';
import { DelonABCModule } from '@delon/abc';
import { DelonACLModule } from '@delon/acl';
import { DelonFormModule } from '@delon/form';
import { DelonChartModule } from '@delon/chart';

// #region third libs
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule
];
// #endregion

import { comservices,dataServices} from './services'

import {
  mkDateformatPipe,
  mkStateArray,
  mkEnumformatPipe,
  mkSafeUrlformatPipe,
} from './pipes';
import { EditorTinymceComponent } from './components';

import {
  mkAutoSizeDirective
} from './directives';


// #region your componets & directives
const COMPONENTS = [
  EditorTinymceComponent,
];
const DIRECTIVES = [mkAutoSizeDirective];
const PROVIDERS = [comservices];
const PIPES = [
  mkDateformatPipe,
  mkStateArray,
  mkEnumformatPipe,
  mkSafeUrlformatPipe,
]

// #endregion

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    DelonChartModule,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    EditorTinymceComponent,
  ],
  providers:[
    ...PROVIDERS,
    dataServices,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonFormModule,
    DelonChartModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ]
})
export class SharedModule { }
