import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'dpcarmanager-main',
  template: `<router-outlet></router-outlet>`
})
export class DpcarmanagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "业务管理", routerLink: "./sitemanager/" });
  }
}
