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

import {PsbgSpComponent} from '../psbg-sp/psbg-sp.component';
import {PartnerworkEditComponent} from './../../common/partnerwork-edit/partnerwork-edit.component';

import {HhrAchivedComponent} from './../../common/hhr-achived/hhr-achived.component';
@Component({
  selector: 'app-preapproved',
  templateUrl: './preapproved.component.html',
  styleUrls: ['./preapproved.component.scss']
})
export class PreapprovedComponent implements OnInit {
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
      validstate:"1060"
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
  

  readReport(item){
    var data = {HeadText:'评审报告',itemdata:item}
    const modal = this.modalHelper.create(PsbgSpComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  PrintReport(item){
    if(item.workenddate != null){
      //直接下载打印
      var postData = {
        enterpriseid:this.comservices.getEnterPrise,
        dealperson:this.comservices.getUserName,
        keycode:item.keycode
      }
      this.dataServices.yjd_download(postData).subscribe(result => {
        if(result){
          window.location = WebConfig.RequestUrl.dpworkservice + result.data
        }
      })
    }else{
      var data = {HeadText:'填写移交单',itemdata:item}
      const modal = this.modalHelper.create(PartnerworkEditComponent,{ data: data},{size:600}).subscribe(res => {
        this.loadData()
      });
    }
  }

  ReadData(item){
    var data = {HeadText:'合伙人档案',itemdata:item}
    const modal = this.modalHelper.create(HhrAchivedComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}

