import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'workflowmanager-main',
  template: `<router-outlet></router-outlet>`
})
export class WorkflowmanagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "工作流管理", routerLink: "./workflowmanager/rolelist" });
  }
}
