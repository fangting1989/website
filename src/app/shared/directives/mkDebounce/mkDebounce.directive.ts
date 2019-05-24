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
  selector: '[mkdebounce]'
})
export class mkDebounceDirective implements OnInit, OnDestroy {

    @Input() debounceTime = 500;
    @Output() debounceClick = new EventEmitter();
    private clicks = new Subject<any>();
    private subscription: Subscription;

    constructor() { }

    ngOnInit() {
        this.subscription = this.clicks.pipe(debounceTime(this.debounceTime))
            .subscribe(e => this.debounceClick.emit(e));
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    }
}