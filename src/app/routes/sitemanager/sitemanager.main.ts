import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'sitemanager-main',
  template: `<router-outlet></router-outlet>`
})
export class SitemanagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "网站管理", routerLink: "./sitemanager/" });
  }
}
