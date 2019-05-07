import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from '../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { ModalHelper } from '@delon/theme';
import { TCustomerEditComponent} from '../tcustomer-edit/tcustomer-edit.component'
@Component({
  selector: 'app-customer-read',
  templateUrl: './customer-read.component.html',
  styleUrls: ['./customer-read.component.scss']
})
export class CustomerReadComponent implements OnInit {

  model:any = {}
  dataItem:any = {}
  data: any;
  EnterPriseCode:any;
  DataList:any = [];
  changeState:any = false;
  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.dataItem = Object.assign({}, this.data.itemdata);
      }
    }
    this.loadLinklogList();
  }

  loadData(){

  }

  loadLinklogList(){
    //加载银行卡
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      customerid:this.dataItem.keycode
    }
    this.dataServices.tlinklogList(postData).subscribe(result => {
      if (result != null) {
        this.DataList = result.data;
      }
    })
  }
  EditItem(){
    var self = this;
    var item = this.dataItem
    var data = {HeadText:'客户信息',itemdata:item}
    const modal = this.modalHelper.create(TCustomerEditComponent,{ data: data},{size:500}).subscribe(res => {
      if(res){
        self.dataItem = res;
        self.changeState = true;
      }
    });
  }
  SaveClick(){
    var self = this;
    var postData = {
      customerid:this.dataItem.keycode,
      blpersion:this.comservices.getUserName,
      blcontent:this.model.content,
      enterpriseid:this.EnterPriseCode
    }
    this.dataServices.tlinklogIn(postData).subscribe(result => {
      if (result != null) {
        this.msg.success("操作成功!");
        self.model = {};
        this.loadLinklogList();
      }
    })
  }

}
