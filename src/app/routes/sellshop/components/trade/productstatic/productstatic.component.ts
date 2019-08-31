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
  selector: 'app-productstatic',
  templateUrl: './productstatic.component.html',
  styleUrls: ['./productstatic.component.scss']
})
export class ProductstaticComponent implements OnInit {

  date_range: Date[] = [];

  CurrData:any = []

  ProductList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;

  constructor(
    private comservices:comservices,
    private dataServices:dataServices,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService,
  ) { }

  ngOnInit() {
    this.setDate('week')
  }
  

  DateChange(e){ 

    this.loadOrder();
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
    this.loadOrder();
  }

  loadOrder() {
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
      pagesize:this.PageSize,
      pagenum:this.PageNum,
    }
    this.dataServices.productordersale(postData).subscribe(result => {
      if(result){
        this.ProductList = result.data;
      }
    })

  }
}
