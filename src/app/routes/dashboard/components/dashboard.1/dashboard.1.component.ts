import { Component, OnInit } from '@angular/core';
import { dataServices } from '../../services';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { comservices} from '../../../../shared/services';
@Component({
  selector: 'app-dashboard_1',
  templateUrl: './dashboard.1.component.html',
  styleUrls: ['./dashboard.1.component.scss']
})
export class Dashboard_1Component implements OnInit {

  Statics1:any = {
    info:'合伙人同比统计',
    content:'同比上周',
    desc:'总合伙人数量',
    title:'本周新增',
    data:{}
  }

  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
    this.loadStatic1();
  }

  changeTab(e){

  }

  loadStatic1(){
    var self = this;
    var postData = {
      enterpriseid: this.EnterPriseCode
    }
    this.dataServices.partner(postData).subscribe(result => {
      if (result != null) {
        self.Statics1.data = result.data;
        if(self.Statics1.data.last7_increase >= 0){
          self.Statics1.data.up = true;
        }else{
          self.Statics1.data.up = false;
          self.Statics1.data.last7_increase = Math.abs(self.Statics1.data.last7_increase);
        }
      }
    })
    
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode
    }
    this.dataServices.datalist(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }
}
