import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'paymanager-main',
  template: `<router-outlet></router-outlet>`
})
export class PayManagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "商品管理", routerLink: "./prodmanager/prodlist" });
  }
}
