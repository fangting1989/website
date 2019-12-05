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
import { TOrderEditComponent} from '../torder-edit/torder-edit.component'
import {OrderSendComponent} from '../order-send/order-send.component';
import {OrderExpressComponent} from '../order-express/order-express.component';
import * as moment from  'moment'
@Component({
  selector: 'app-torder-list',
  templateUrl: './torder-list.component.html',
  styleUrls: ['./torder-list.component.scss']
})
export class TOrderListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = true;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  stateList:any = Object.assign([],Enums.orderisvalid) 
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
      _.each(this.stateList,it=>{
        if(it.value == state){
          it.active = true;
        }
      })
    }
    this.loadData();
    // this.getOrderState();
  }

  loadData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode 
    }
    if(this.orderisvalid){
      postData.orderisvalid = this.orderisvalid;
    }
    if(this.searchObject.startdate){
      postData.startdate = this.searchObject.startdate;
    }
    if(this.searchObject.enddate){
      postData.enddate = this.searchObject.enddate;
    }
    this.dataServices.torderList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })

    this.getOrderState();
  }

  getOrderState(){
    //sp_getorderstate
    var state_arr = _.filter(this.stateList,it=>{
      return it.value != null;
    }) 
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      list:state_arr
    }
    this.dataServices.sp_getorderstate(postData).subscribe(result => {
      if(result){
        _.each(this.stateList,it=>{
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

  SearchClick(e){
    this.PageNum = 1;
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  StateListItem(e,item){
    _.each(this.stateList,it=>{
      it.active = false;
    })
    item.active = true;
    //this.stateList = Object.assign([],this.stateList)
    this.orderisvalid = item.value;
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

  editItem(item){
    this.router.navigate(['/sellshop/torderedit'],{ queryParams: { keycode: item.keycode } });
  }

  deleteItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认关闭当前订单</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode
        }
        self.dataServices.torderDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("关闭成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  SendOrder(item){
    var data = {HeadText:'订单详情',itemdata:item}
    const modal = this.modalHelper.create(OrderSendComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
      this.getOrderState();
    });
  }

  OrderExpress(item){
    var data = {HeadText:'订单详情',itemdata:item}
    const modal = this.modalHelper.create(OrderExpressComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
      this.getOrderState();
    });
  }
}
