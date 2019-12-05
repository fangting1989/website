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
  WorkflowRollbackComponent,
  WorkcartasklistComponent,
  CartaskcreateComponent,
} from './compts'

import {
    ProcessProweruserComponent,
    ProcessProwerprocessComponent,
    TProcessenterpriseEditComponent,
    TProcessenterpriseListComponent,
    TProcessconfigEditComponent,
  } from './components';
//services
import { dataServices,cardataServices } from './services';

import {Components} from './workflowmanager.components';
import { ComponentPanelComponent } from './compts/workflow/component-panel/component-panel.component';
import { SelWorkflowComponentComponent } from './components/processlist/sel-workflow-component/sel-workflow-component.component';
import { AddprocesscontentComponent } from './components/processlist/addprocesscontent/addprocesscontent.component';

//组件导入
// import {DpcarmanagerModule} from './../dpcar/dpcarmanager.module';
import {DpcarworkflowModule} from './../dpcarworkflow/dpcarworkflow.module';
import { ComponentPanelEmptyComponent } from './compts/workflow/component-panel-empty/component-panel-empty.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularSplitModule,
    SharedModule,
    routing, 
    // DpcarmanagerModule,
    DpcarworkflowModule, 
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
    WorkcartasklistComponent,
    CartaskcreateComponent,
    ComponentPanelEmptyComponent,
    TProcessconfigEditComponent,
  ],
  providers: [
    dataServices,
    cardataServices
  ],
  entryComponents: [
    WorkflowComponent,
    SelWorkflowComponentComponent,
    AddprocesscontentComponent,
    TApprovedEditComponent,
    WorkflowRollbackComponent,
    ProcessProweruserComponent,
    TProcessenterpriseEditComponent,
    TProcessconfigEditComponent,
    ...Components,
  ]
})
export class WorkflowManagerModule {
  constructor(
   
  ) {
    
  }
}
