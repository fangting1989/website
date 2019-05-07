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
  BtestComponent
} from './components';
import { ModelsComponent } from './components/models/models.component';
import { ModelEditComponent } from './components/models/model-edit/model-edit.component';


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
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    WorkflowComponent
  ]
})
export class WorkflowManagerModule {
  constructor(
   
  ) {
    
  }
}
