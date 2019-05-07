import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../../core/common';
import { dataServices } from '../../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../../shared/services';
import {TxDetailComponent} from '../../common/tx-detail/tx-detail.component';

@Component({
  selector: 'app-jtzpreapproved',
  templateUrl: './jtzpreapproved.component.html',
  styleUrls: ['./jtzpreapproved.component.scss']
})
export class JtzpreapprovedComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  CustomType:any = [{name:'潜力客户',value:1},{name:'意向客户',value:2}]
  ShowMore:any = false

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      isvalid:1020
    }
    this.dataServices.toutmoneyList(postData).subscribe(result => {
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

  PassItem(item){
    var data = {HeadText:'业务提现审核表',itemdata:item}
    item.passstate = 1;
    const modal = this.modalHelper.create(TxDetailComponent,{ data: data},{size:500}).subscribe(res => {
      this.loadData()
    });
  }
  UnPassItem(item){
    var data = {HeadText:'业务提现审核表',itemdata:item}
    item.passstate = 2;
    const modal = this.modalHelper.create(TxDetailComponent,{ data: data},{size:500}).subscribe(res => {
      this.loadData()
    });
  }
  ItemDetail(item){
    var data = {HeadText:'业务提现审核表',itemdata:item}
    item.passstate = 0;
    const modal = this.modalHelper.create(TxDetailComponent,{ data: data},{size:500}).subscribe(res => {
      this.loadData()
    });
  }
}






