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
  selector: 'app-gwsorder-list',
  templateUrl: './gwsorder-list.component.html',
  styleUrls: ['./gwsorder-list.component.scss']
})
export class GwsorderListComponent implements OnInit {
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
  gwsList:any;
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
    this.loadbrand();
  }

  loadbrand(){
    var self = this;
    var postData = {
      pagesize:1000,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      memberid:this.comservices.getUserCode
    }
    this.dataServices.trtgwsList(postData).subscribe(result => {
      if (result != null) {
        self.gwsList = result.data;
        this.loadData();
      }
    })
  }

  loadData(){
    var self = this;
    if(self.gwsList.length == 0){
      this.msg.error("请先配置品牌")
      return
    }
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
    var brandids = ""
    _.each(this.gwsList,it=>{
      brandids += (brandids == ""?"":",") + it.productbrandid;
    })
    postData.brandids = brandids;
    console.log(postData)
    this.dataServices.torderList(postData).subscribe(result => {
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
    _.each(this.stateList,it=>{
      it.active = false;
    })
    item.active = true;
    console.log(item)
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
    });
  }

  OrderExpress(item){
    var data = {HeadText:'订单详情',itemdata:item}
    const modal = this.modalHelper.create(OrderExpressComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}
