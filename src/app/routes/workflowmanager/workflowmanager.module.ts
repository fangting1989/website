import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './workflowmanager.routing';
import { WorkflowmanagerMain } from './workflowmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';

import {WorkflowComponent,
  WorktasklistComponent} from './compts'
//services
import { dataServices } from './services';

import {
  AtestComponent,
  BtestComponent,
  ModelEditComponent,
  ModelsComponent,
  ModelAddComponent,
} from './components';
import { ProcesslistComponent } from './components/processlist/processlist.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    AngularSplitModule,
    SharedModule
  ],
  declarations: [
    WorkflowmanagerMain,
    AtestComponent,
    BtestComponent,
    WorktasklistComponent,
    WorkflowComponent,
    ModelsComponent,
    ModelEditComponent,
    ModelAddComponent,
    ProcesslistComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    WorkflowComponent,
    ModelEditComponent,
    ModelAddComponent
  ]
})
export class WorkflowManagerModule {
  constructor(
   
  ) {
    
  }
}
