import { Injectable, Pipe } from '@angular/core';
import * as moment from "moment";

@Pipe({
  name: 'mkdateformatpipe'
})
@Injectable()
export class mkDateformatPipe {
  transform(value, args) {
    if(typeof args == 'undefined' || args == null){
        return value;
    }
    try{
      var ret = moment(value).format(args)
      if(ret == 'Invalid date'){
        return value
      }
      return ret
    }
    catch(e){
        return value
    }
  }
}
