import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { HhrEditComponent} from './hhr-edit/hhr-edit.component'
import { ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-hhrapply',
  templateUrl: './hhrapply.component.html',
  styleUrls: ['./hhrapply.component.scss']
})
export class HhrapplyComponent implements OnInit {

  private router$: Subscription;
  CurrIndex:any;
  tabs: any[] = [
    {
      key: 'applyprogress',
      tab: '申请进度',
    },
    {
      key: 'hrrpass',
      tab: '申请记录',
    },
  ];

  pos = 0;

  constructor(private router: Router,
    private modalHelper:ModalHelper,) {}

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
    this.router.navigateByUrl(`/custommanager/hhrapply/${item.key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }

  addHhr(){
    var self = this;
    var item = {}
    var data = {HeadText:'客户信息',itemdata:item}
    const modal = this.modalHelper.create(HhrEditComponent,{ data: data},{size:800}).subscribe(res => {
      
      self.router.navigateByUrl(`/custommanager/hhrapply/applyprogress?r=`+Math.random());
    });
  }
}




