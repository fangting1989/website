import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {_} from 'underscore'
@Injectable()
export class GlobalState {
  private SlimType = new Subject();
  output$ = this.SlimType.asObservable();

  private eventNameArray = [];

  private _data = new Subject<Object>();
  private _dataStream$ = this._data.asObservable();
  private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();
  constructor() {
    this._dataStream$.subscribe((data) => this._onEvent(data));
  }

  notifyDataChanged(event, value) {
    let current = this._data[event];
    if (current !== value) {
      this._data[event] = value;
      this._data.next({
        event: event,
        data: this._data[event]
      });
    }
  }

  subscribe(event: string, eventName:string,callback: Function) {
    var findCount = 0;
    _.each(this.eventNameArray,it=>{
      if(it == eventName){
        findCount  = findCount + 1;
      }
    })
    if(!findCount){
      let subscribers = this._subscriptions.get(event) || [];
      subscribers.push(callback);
      this._subscriptions.set(event, subscribers);
    }
  }

  _onEvent(data: any) {
    let subscribers = this._subscriptions.get(data['event']) || [];

    subscribers.forEach((callback) => {
      callback.call(null, data['data']);
    });
  }

  SlimLoading(message: any) {
    this.SlimType.next(message);
  }
}
