import { Injectable, Pipe } from '@angular/core';
import {Enums} from './../../utils/enums';
import {_} from 'underscore';
@Pipe({
  name: 'mkenumformatpipe'
})
@Injectable()
export class mkEnumformatPipe {
  transform(value, args) {
    if(typeof args == 'undefined' || args == null){
        return value;
    }
    var findData = false;
    var Enumdata = null;
    for (var item in Enums){
      if(item == args){
        findData = true
        Enumdata = Enums[item]
      }
    }
    var ret = value
    _.each(Enumdata,function(item){
      if(value == item.value){
          ret = item.name
      }
    })
    return ret
  }
}
