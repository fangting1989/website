import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'dpcarworkflow-main',
  template: `<router-outlet></router-outlet>`
})
export class DpcarworkflowMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "业务组件", routerLink: "./sitemanager/" });
  }
}
