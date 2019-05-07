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
import { ZxEditComponent} from '../zx-edit/zx-edit.component';
import { ZxImagesComponent} from '../zx-images/zx-images.component';
import { ZxPsbgComponent} from '../zx-psbg/zx-psbg.component';
import {MaterialEditComponent} from '../material-edit/material-edit.component';

import {HhrAchivedComponent} from './../../common/hhr-achived/hhr-achived.component';

@Component({
  selector: 'app-processing',
  templateUrl: './processing.component.html',
  styleUrls: ['./processing.component.scss']
})
export class ProcessingComponent implements OnInit {
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
  allChecked:any = false

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
    // var postData = {
    //   pagesize:this.PageSize,
    //   pagenum:this.PageNum,
    //   searchtext:this.searchObject.searchText,
    //   enterpriseid: this.EnterPriseCode,
    //   actinstpersioncode:this.comservices.getUserCode,
    //   validstate:"1020,1025,1030,1050"
    // }
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      actinstpersioncode:this.comservices.getUserCode,
      validstate:"1020,1025,1030,1050",
      pre_dealperson:this.comservices.getUserName
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

  ZxEdit(item){
    var data = {HeadText:'征信信息',itemdata:item}
    const modal = this.modalHelper.create(ZxEditComponent,{ data: data},{size:900}).subscribe(res => {
      this.loadData()
    });
  }

  UploadHkd(item){
    var data = {HeadText:'上传汇款单',itemdata:item}
    const modal = this.modalHelper.create(ZxImagesComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editZxbg(item){
    var data = {HeadText:'评审报告',itemdata:item}
    const modal = this.modalHelper.create(ZxPsbgComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editBccl(item){
    var data = {HeadText:'补充材料',itemdata:item}
    const modal = this.modalHelper.create(MaterialEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  ReadData(item){
    var data = {HeadText:'合伙人档案',itemdata:item}
    const modal = this.modalHelper.create(HhrAchivedComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editReport(item){
    this.msg.info("移交报告单")
  }
}


