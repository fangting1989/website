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
  selector: 'app-memberstatic',
  templateUrl: './memberstatic.component.html',
  styleUrls: ['./memberstatic.component.scss']
})
export class MemberstaticComponent implements OnInit {

  date_range: Date[] = [];
  CurrData:any = []

  date_range_cost:Date[] = [];

  @ViewChild('g2custom', { read: ViewContainerRef }) g2custom: ViewContainerRef;

  @ViewChild('g2custom_cost', { read: ViewContainerRef }) g2custom_cost: ViewContainerRef;

  constructor(
    private comservices:comservices,
    private dataServices:dataServices,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.setDate('week')
    this.setDate_cost('week')
  }
  
  timespan_membercount(){
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
    this.dataServices.timespan_membercount(postData).subscribe(result => {
      if(result){
        this.CurrData = result.data;
        this.g2custom.element.nativeElement.innerHTML = ""
        this.render(this.g2custom.element)
      }
    })
  }

  DateChange(e){ 
    this.timespan_membercount();
  }

  setDate(type){
    this.date_range = getTimeDistance(type);
    if(type == 'week'){
      var newData = [];
      newData.push(moment().add(-6, 'd').format("YYYY-MM-DD"));
      newData.push(moment().format("YYYY-MM-DD"));
      this.date_range = newData;
    }
    setTimeout(() => this.cdr.detectChanges());
    this.timespan_membercount();
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
    chart.scale('mcount', {
      min: 0,
      alias:'数量'
    });
    chart.scale('dayname', {
      range: [0, 1]
    });
    chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    chart.line().position('dayname*mcount');
    chart.point().position('dayname*mcount').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  }

  /*****会员消费统计 */
  DateChange_cost(e){ 
    this.memberordermoneycost();
  }

  setDate_cost(type){
    this.date_range_cost = getTimeDistance(type);
    if(type == 'week'){
      var newData = [];
      _.each(this.date_range_cost,it=>{
        it = moment(it).add(1, 'd').format();
        newData.push(it);
      })
      this.date_range_cost = newData;
    }
    setTimeout(() => this.cdr.detectChanges());
    this.memberordermoneycost();
  }


  memberordermoneycost(){
    if(this.date_range_cost.length != 2 ){
      this.msg.error("请选择时间区间");
      return;
    }

    var startday = moment(this.date_range_cost[0]).format("YYYYMMDD")
    var endday = moment(this.date_range_cost[1]).format("YYYYMMDD")

    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      startdate:startday,
      enddate:endday,
    }
    this.dataServices.memberordermoneycost(postData).subscribe(result => {
      if(result){
        this.CurrData = result.data;
        this.g2custom_cost.element.nativeElement.innerHTML = ""
        this.render_cost(this.g2custom_cost.element)
      }
    })
  }
  render_cost(el: ElementRef) {
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

