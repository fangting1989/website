import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService,
  NzModalRef
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-order-bill-detail',
  templateUrl: './order-bill-detail.component.html',
  styleUrls: ['./order-bill-detail.component.scss']
})
export class OrderBillDetailComponent implements OnInit {
  data:any;
  datamodel:any;
  DataList:any = []
  CurrItem:any = null;
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  submitting = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  CustomType:any = [{name:'潜力客户',value:1},{name:'意向客户',value:2}]
  ShowMore:any = false
  allChecked:any = false
  AddressModel:any = {};
  isVisible:any = false;
  model:any = {}

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private modal: NzModalRef,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "分配"
      }
      if (this.data.itemdata) {
        this.datamodel = Object.assign({}, this.data.itemdata);
      }
    }
    console.log(this.datamodel)
    this.loadData();
    this.loadaddress();
  }

  loadData(){
    var self = this;
    var postData = {
      memticketid:this.datamodel.keycode,
      enterpriseid:this.EnterPriseCode,
      pagesize:1000,
    }
    this.dataServices.torderdetailList(postData).subscribe(result => {
      if(result){
        this.DataList = result.data
      }
    })
  }

  loadaddress(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      isdefault:1,
      memberid:this.datamodel.memberid
    }
    this.dataServices.taddressList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.AddressModel = result.data[0];
      }
    })
  }


  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

  saveClick(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      operateperson:this.comservices.getUserName,
      isvalid:10,
      keycode:this.datamodel.keycode
    }
    this.dataServices.tmemticketUp(postData).subscribe(result => {
      if(result){
        this.msg.success("操作成功!")
        this.isVisible = false;
        this.closeModal();
      }
    })
  }

  cancelClick(){
    this.isVisible = true
  }
  handleCancel(){
    this.isVisible = false
  }

  handleOk(){
    console.log("1-2-3-4-")
    if(this.submitting){
      return
    }
    this.submitting = true;
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      operateperson:this.comservices.getUserName,
      advice:this.model.rejectreason,
      isvalid:8,
      keycode:this.datamodel.keycode
    }
    this.dataServices.tmemticketUp(postData).subscribe(result => {
      this.submitting = false;
      if(result){
        this.msg.success("操作成功!")
        this.isVisible = false;
        this.closeModal();
      }
    })
  }
}



