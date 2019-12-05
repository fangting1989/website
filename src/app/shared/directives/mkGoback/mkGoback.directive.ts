import {
    Directive,
    EventEmitter,
    HostListener,
    OnInit,
    Output,
    OnDestroy,
    Input
  } from "@angular/core";
  import { Subject,Subscription,Observable, pipe } from 'rxjs';
  import {debounceTime} from "rxjs/operators";
@Directive({
  selector: '[mkgoback]'
})
export class mkGobackDirective implements OnInit {

    @Input() debounceTime = 500;
    @Output() debounceClick = new EventEmitter();
    private clicks = new Subject<any>();
    private subscription: Subscription;

    constructor() { }

    ngOnInit() {
      
    }

    @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        window.history.go(-1)
    }
}