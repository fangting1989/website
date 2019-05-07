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

import {HhrAchivedComponent} from './../../common/hhr-achived/hhr-achived.component';
@Component({
  selector: 'app-psysapprovedlog',
  templateUrl: './psysapprovedlog.component.html',
  styleUrls: ['./psysapprovedlog.component.scss']
})
export class PsysapprovedlogComponent implements OnInit {
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
      validstate:"1090,1095",
      dealperson:this.comservices.getUserName
    }
    this.dataServices.tpartnerList(postData).subscribe(result => {
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

  // addClick(record: any = {}){
  //   var data = {HeadText:'编辑'}
  //   const modal = this.modalHelper.create(TCustomerEditComponent,{ data: data},{size:800}).subscribe(res => {
  //     this.loadData()
  //   });
  // }

  // editItem(item){
  //   var data = {HeadText:'编辑',itemdata:item}
  //   const modal = this.modalHelper.create(TCustomerEditComponent,{ data: data},{size:800}).subscribe(res => {
  //     this.loadData()
  //   });
  // }


  ReadData(item){
    var data = {HeadText:'合伙人档案',itemdata:item}
    const modal = this.modalHelper.create(HhrAchivedComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}


