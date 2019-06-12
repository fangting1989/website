import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';
import { Dashboard_1Component } from './components/dashboard.1/dashboard.1.component';
import { Dashboard_2Component } from './components/dashboard.2/dashboard.2.component';

import {dataServices} from './services';
import { DashboardDefaultComponent } from './components/dashboard-default/dashboard-default.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    Dashboard_1Component, Dashboard_2Component, DashboardDefaultComponent
  ],
  providers: [
    dataServices
  ],
  entryComponents:[
    Dashboard_1Component, 
    Dashboard_2Component,
    DashboardDefaultComponent, 
  ]
})
export class DashboardModule {}
