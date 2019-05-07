import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mkautosize]'
})
export class mkAutoSizeDirective {
  constructor(el: ElementRef) {
    console.log(el)
    setTimeout(function(){
        console.log(autosize)
        console.log("我改变了，我改变了")
        //el.nativeElement.style.height = 'auto';  
        console.log(el.nativeElement.scrollTop)
        console.log(el.nativeElement.scrollHeight)
        //el.nativeElement.style.height = el.nativeElement.scrollHeight + "px";
        autosize(el.nativeElement)
    },3000)
   }
}