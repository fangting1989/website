import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dsk',
  templateUrl: './dsk.component.html',
  styles: []
})
export class DskComponent implements OnInit {

  private router$: Subscription;
  tabs: any[] = [
    {
      key: 'dskpage',
      tab: '待收款',
    },
    {
      key: 'dsklogpage',
      tab: '收款记录',
    },
  ];

  pos = 0;

  constructor(private router: Router) {}

  private setActive() {
    const key = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
    const idx = this.tabs.findIndex(w => w.key === key);
    if (idx !== -1) this.pos = idx;
  }

  ngOnInit(): void {
    this.router$ = this.router.events
      .pipe(filter(e => e instanceof ActivationEnd))
      .subscribe(() => this.setActive());
    this.setActive();
  }

  to(item: any) {
    this.router.navigateByUrl(`/custommanager/dsk/${item.key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }

}