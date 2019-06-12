import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zcsh',
  templateUrl: './zcsh.component.html',
  styleUrls: ['./zcsh.component.scss']
})
export class ZcshComponent implements OnInit {

  private router$: Subscription;
  tabs: any[] = [
    {
      key: 'processing',
      tab: '待审核',
    },
    {
      key: 'approvedlog',
      tab: '审核记录',
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
    this.router.navigateByUrl(`/custommanager/zcsh/${item.key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }
}