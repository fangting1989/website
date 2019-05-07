import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'sysmanager-main',
  template: `<router-outlet></router-outlet>`
})
export class SysmanagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "系统管理", routerLink: "./sysmanager/rolelist" });
  }
}
