import { Component, OnInit,ElementRef,ChangeDetectorRef,ViewChild,TemplateRef,ViewContainerRef } from '@angular/core';
import {comservices} from './../../../../../shared/services/comservices';
import {dataServices} from './../../../services';
import { getTimeDistance } from '@delon/util';
import * as moment from  'moment';
import {_} from 'underscore';
import { Z_DATA_ERROR } from 'zlib';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';

@Component({
  selector: 'app-tradestatic',
  templateUrl: './tradestatic.component.html',
  styleUrls: ['./tradestatic.component.scss']
})
export class TradestaticComponent implements OnInit {

  date_range: Date[] = [];

  CurrData:any = []

  @ViewChild('g2custom', { read: ViewContainerRef }) g2custom: ViewContainerRef;
  constructor(
    private comservices:comservices,
    private dataServices:dataServices,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.setDate('week')
  }
  
  ordermoneycount(){
    if(this.date_range.length != 2 ){
      this.msg.error("请选择时间区间");
      return;
    }

    var startday = moment(this.date_range[0]).format("YYYYMMDD")
    var endday = moment(this.date_range[1]).format("YYYYMMDD")

    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      startdate:startday,
      enddate:endday,
    }
    this.dataServices.ordermoneycount(postData).subscribe(result => {
      if(result){
        this.CurrData = result.data;
        this.g2custom.element.nativeElement.innerHTML = ""
        this.render(this.g2custom.element)
      }
    })
  }

  DateChange(e){ 
    this.ordermoneycount();
  }

  setDate(type){
    console.log(moment().format("YYYYMMDD"))
    this.date_range = getTimeDistance(type);
    if(type == 'week'){
      var newData = [];
      newData.push(moment().add(-6, 'd').format("YYYY-MM-DD"));
      newData.push(moment().format("YYYY-MM-DD"));
      this.date_range = newData;
    }
    setTimeout(() => this.cdr.detectChanges());
    this.ordermoneycount();
  }

  render(el: ElementRef) {
    var self = this;
    // 开始编写 G2 代码
    var chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height: window.innerHeight * 0.6
    });
    chart.source(self.CurrData);
    chart.scale('count', {
        min: 0,
    });
    chart.axis('name', {
      title: null
    });
    chart.interval().position('name*count');
    chart.render();
  }
}
