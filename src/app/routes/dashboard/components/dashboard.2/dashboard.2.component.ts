import { Component, OnInit,ElementRef,ChangeDetectorRef,ViewChild,TemplateRef,ViewContainerRef } from '@angular/core';
import {comservices} from './../../../../shared/services/comservices';
import {dataServices} from './../../services';
import { getTimeDistance } from '@delon/util';
import * as moment from  'moment';
import {Router} from '@angular/router';
import {_} from 'underscore';
import { Z_DATA_ERROR } from 'zlib';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
@Component({
  selector: 'app-dashboard_2',
  templateUrl: './dashboard.2.component.html',
  styleUrls: ['./dashboard.2.component.scss']
})
export class Dashboard_2Component implements OnInit {

  date_range: Date[] = [];

  dayOrderCount:any = 0;
  dayOrderSaleAmount:any = 0
  yesterDaySaleAmount:any = 0;
  last7DaySaleAmount:any = 0;

  //本周 本月  时间区间
  thisweek:any = []
  thismoneth:any = [];
  timespan:any = [];
  CurrData:any = []

  stateArray:any=[{name:'代付款订单',value:1},
    {name:'待发货订单',value:10},
    {name:'已发货订单',value:20},
    {name:'已完成待评价',value:'90'},
    {name:'待退货处理',value:'95'}
  ]
  
  @ViewChild('g2custom', { read: ViewContainerRef }) g2custom: ViewContainerRef;

  constructor(
    private comservices:comservices,
    private dataServices:dataServices,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.loaddayOrderCount();
    this.loaddaySaleAmount();
    this.loadyesterdaysaleamount();
    this.loadlastday7saleamount();

    this.setDate('week')
    this.orderState();
  }

  loaddayOrderCount(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.sp_dayordercount(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.dayOrderCount = result.data[0].mcount
      }
    })
  }

  loaddaySaleAmount(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.sp_daysaleamount(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.dayOrderSaleAmount = result.data[0].paymoney
      }
    })
  }

  loadyesterdaysaleamount(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.sp_yesterdaysaleamount(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.yesterDaySaleAmount = result.data[0].paymoney
      }
    })
  }

  loadlastday7saleamount(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.sp_lastday7saleamount(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.last7DaySaleAmount = result.data[0].paymoney
      }
    })
  }

  loadlastweekcount(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.sp_lastweekcount(postData).subscribe(result => {
      if(result){
        this.CurrData = result.data;
      }
    })
  }

  loadlastmonthcount(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise
    }
    this.dataServices.sp_lastmonthcount(postData).subscribe(result => {
      if(result){
        this.CurrData = result.data;
      }
    })
  }

  loaddayspancount(){
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
    this.dataServices.sp_dayspancount(postData).subscribe(result => {
      if(result){
        this.CurrData = result.data;
        this.g2custom.element.nativeElement.innerHTML = ""
        this.render(this.g2custom.element)
      }
    }) 
  }

  //获得订单状态
  orderState(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      list:this.stateArray
    }
    this.dataServices.sp_getorderstate(postData).subscribe(result => {
      if(result){
        _.each(this.stateArray,it=>{
          //导航地址
          _.each(result.data,iit =>{
            if(it.value == iit.value){
              it.count = iit.count;
            }
          })
        })
      }
    })
  }
  

  DateChange(e){ 
    this.loaddayspancount();
  }

  setDate(type){
    this.date_range = getTimeDistance(type);
    if(type == 'week'){
      var newData = [];
      _.each(this.date_range,it=>{
        it = moment(it).add(1, 'd').format();
        newData.push(it);
      })
      this.date_range = newData;
    }
    setTimeout(() => this.cdr.detectChanges());
    this.loaddayspancount();
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
    chart.scale('paymoney', {
      min: 0,
      alias:'销售额'
    });
    chart.scale('dayname', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('dayname*paymoney');
    chart.point().position('dayname*paymoney').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();

  }

  StateItemClick(item){
    this.router.navigate(['/sellshop/torderlist'],{ queryParams: { state: item.value } });
  }

}
