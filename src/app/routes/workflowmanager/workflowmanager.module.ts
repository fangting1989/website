import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './workflowmanager.routing';
import { WorkflowmanagerMain } from './workflowmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';

import {WorkflowComponent,
  WorktasklistComponent,
  WorktaskcreateComponent} from './compts'
//services
import { dataServices } from './services';

import {Components} from './workflowmanager.components';
import { ComponentPanelComponent } from './compts/workflow/component-panel/component-panel.component';
import { SelWorkflowComponentComponent } from './components/processlist/sel-workflow-component/sel-workflow-component.component';
import { AddprocesscontentComponent } from './components/processlist/addprocesscontent/addprocesscontent.component';


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
    ...Components,
    WorktasklistComponent,
    WorkflowComponent,
    WorktaskcreateComponent,
    ComponentPanelComponent,
    SelWorkflowComponentComponent,
    AddprocesscontentComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    WorkflowComponent,
    SelWorkflowComponentComponent,
    AddprocesscontentComponent,
    ...Components,
  ]
})
export class WorkflowManagerModule {
  constructor(
   
  ) {
    
  }
}
