import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ModalHelper } from '@delon/theme';
import { TCustomerEditComponent} from '../tcustomer-edit/tcustomer-edit.component'

@Component({
  selector: 'com-alllist',
  templateUrl: './alllist.component.html',
  styleUrls: ['./alllist.component.scss']
})
export class AlllistComponent implements OnInit {

  private router$: Subscription;
  tabs: any[] = [
    {
      key: 'customerlist',
      tab: '全部客户',
    },
    // {
    //   key: 'fxcustomerlist',
    //   tab: '分销客户',
    // },
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
    this.router.navigateByUrl(`/custommanager/allcustomerlist/${item.key}`);
  }

  ngOnDestroy() {
    this.router$.unsubscribe();
  }

  addClick(record: any = {}){
    var data = {HeadText:'编辑'}
    var self = this;
    const modal = this.modalHelper.create(TCustomerEditComponent,{ data: data},{size:800}).subscribe(res => {
      self.router.navigateByUrl(`/custommanager/allcustomerlist/customerlist?r=`+Math.random());
    });
  }

  importClick(){

  }

}




