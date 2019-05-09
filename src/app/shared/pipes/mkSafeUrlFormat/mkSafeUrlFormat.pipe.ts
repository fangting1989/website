import { Injectable, Pipe } from '@angular/core';
import {Enums} from './../../utils/enums';
import { DomSanitizer} from '@angular/platform-browser';
import {_} from 'underscore';
@Pipe({
  name: 'mksafeurlformat'
})
@Injectable()
export class mkSafeUrlformatPipe {
    constructor(private sanitizer: DomSanitizer) {}
  transform(value) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
