import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './workflowmanager.routing';
import { WorkflowmanagerMain } from './workflowmanager.main';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';

import {WorkflowComponent,
  WorktasklistComponent,
  WorktaskcreateComponent,
  TApprovedEditComponent,
  WorkflowRollbackComponent} from './compts'

  import {
    ProcessProweruserComponent,
    ProcessProwerprocessComponent,
    TProcessenterpriseEditComponent,
TProcessenterpriseListComponent,
  } from './components';
//services
import { dataServices } from './services';

import {Components} from './workflowmanager.components';
import { ComponentPanelComponent } from './compts/workflow/component-panel/component-panel.component';
import { SelWorkflowComponentComponent } from './components/processlist/sel-workflow-component/sel-workflow-component.component';
import { AddprocesscontentComponent } from './components/processlist/addprocesscontent/addprocesscontent.component';

import {dpCarWorkFlowComponents} from './../dpcar/dpcarmanager.workflow.component';
//组件导入
import {DpcarmanagerModule} from './../dpcar/dpcarmanager.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularSplitModule,
    SharedModule,
    routing, 
    DpcarmanagerModule, 
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
    TApprovedEditComponent,
    WorkflowRollbackComponent,
    ProcessProweruserComponent,
    ProcessProwerprocessComponent,
    TProcessenterpriseEditComponent,
    TProcessenterpriseListComponent,
  ],
  providers: [
    dataServices
  ],
  entryComponents: [
    WorkflowComponent,
    SelWorkflowComponentComponent,
    AddprocesscontentComponent,
    TApprovedEditComponent,
    WorkflowRollbackComponent,
    ProcessProweruserComponent,
    TProcessenterpriseEditComponent,
    ...Components,
    ...dpCarWorkFlowComponents,

  ]
})
export class WorkflowManagerModule {
  constructor(
   
  ) {
    
  }
}
