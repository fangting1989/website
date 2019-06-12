import { Component } from '@angular/core';
import {GlobalState} from './../../core/common';

@Component({
  selector: 'Sellshopmanager-main',
  template: `<router-outlet></router-outlet>`
})
export class SellshopmanagerMain {

  constructor(private _state: GlobalState) {
    this._state.notifyDataChanged('app.nav', { level: 0, NavName: "商城", routerLink: "./sellshopmanager/" });
  }
}
