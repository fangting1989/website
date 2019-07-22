import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {Enums} from './../../../../../shared/utils/enums';
import {Router,ActivatedRoute} from '@angular/router';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import {OrderBillDetailComponent} from '../order-bill-detail/order-bill-detail.component';

import * as moment from  'moment'
@Component({
  selector: 'app-order-bill',
  templateUrl: './order-bill.component.html',
  styleUrls: ['./order-bill.component.scss']
})
export class OrderBillComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = true;
  loading = false;
  EnterPriseCode:any;
  sellshopticketArray:any = [{name:'全部',value:null}].concat(Enums.sellshopticketArray) 
  orderisvalid:any;
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router,
    private route:ActivatedRoute,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.InitData();
    
  }

  InitData(){

    var state = this.route.snapshot.queryParams["state"];
    if(state){
      this.orderisvalid = state
      _.each(this.sellshopticketArray,it=>{
        if(it.value == state){
          it.active = true;
        }
      })
    }
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode 
    }
    if(this.searchObject.isvalid){
      postData.isvalid = this.searchObject.isvalid;
    }
    if(this.searchObject.startdate){
      postData.startdate = this.searchObject.startdate;
    }
    if(this.searchObject.enddate){
      postData.enddate = this.searchObject.enddate;
    }
    this.dataServices.tmemticketList(postData).subscribe(result => {
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

  StateListItem(e,item){
    _.each(this.sellshopticketArray,it=>{
      it.active = false;
    })
    item.active = true;
    this.searchObject.isvalid = item.value;
    this.loadData();
  }

  onDateChange(event){
    if(event.length == 2){
      this.searchObject.startdate = moment(event[0]).format("YYYYMMDD")
      this.searchObject.enddate = moment(event[1]).format("YYYYMMDD")
    }else{
      delete this.searchObject.startdate
      delete this.searchObject.enddate
    }
    this.loadData();
  }

  Detail(item){
    var data = {HeadText:'订单详情',itemdata:item}
    const modal = this.modalHelper.create(OrderBillDetailComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}

