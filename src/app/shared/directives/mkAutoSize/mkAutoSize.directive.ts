import { Directive, ElementRef, DoCheck, Input } from '@angular/core';
import { _ } from 'underscore'
@Directive({
  selector: '[mkautosize]'
})
export class mkAutoSizeDirective implements DoCheck {

  @Input('mkautosize') mkautosize: string;

  BoolDo: any = false;
  elemenet: any;
  AutoSizeFun: any;
  constructor(el: ElementRef) {
    this.elemenet = el;
  }

  ngDoCheck() {
    var self = this;
    var attr_doautosize = self.elemenet.nativeElement.getAttribute("doautosize")
    if (attr_doautosize == '1') {
      return;
    }
    if (self.mkautosize == '1') {
      if (self.elemenet.nativeElement.scrollHeight) {
        //设置对应的元素属性
        autosize(self.elemenet.nativeElement)
        self.elemenet.nativeElement.setAttribute("doautosize", "1")
      }
    }
  }

}