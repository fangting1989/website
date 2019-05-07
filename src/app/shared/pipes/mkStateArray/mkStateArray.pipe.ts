import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";
import {Enums} from './../../utils/enums';
import {_} from 'underscore';

@Pipe({
  name: 'mkstatearray'
})
@Injectable()
export class mkStateArray {
  transform(value) {
      var ret = '不明'
      _.each(Enums.stateArray,function(item){
        if(value == item.value){
            ret = item.name
        }
      })
      return ret
  }
}
