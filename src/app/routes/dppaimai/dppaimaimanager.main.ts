import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'dppaimaimanager-main',
  template: `<router-outlet></router-outlet>`
})
export class DppaimaimanagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "基本信息管理", routerLink: "./sitemanager/" });
  }
}
