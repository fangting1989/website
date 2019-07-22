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
    this.loadData();
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
        console.log(result)
        this.DataList = result.data
      }
    })
    
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }


  refreshStatus(item){
    _.each(this.DataList,it=>{
      it.active = false;
    })
    item.active = true;
    this.CurrItem = item
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }
}



