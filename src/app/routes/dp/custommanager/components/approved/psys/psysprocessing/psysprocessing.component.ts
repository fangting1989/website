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
import * as moment from  'moment'
import {ApprovedZsysComponent} from '../approved-zsys/approved-zsys.component';
import {HhrAchivedComponent} from './../../common/hhr-achived/hhr-achived.component';

@Component({
  selector: 'app-psysprocessing',
  templateUrl: './psysprocessing.component.html',
  styleUrls: ['./psysprocessing.component.scss']
})
export class PsysprocessingComponent implements OnInit {
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
      isvalid:1070
    }
    this.dataServices.tpartnerList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        _.each(self.DataList,item=>{
          item.active  = 1;
          self.loadApproved(item);
        })
      }
    })
  }
  //加载对应的审批
  loadApproved(dataItem){
    var self = this;
    var postData = {
      pagesize:1,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:dataItem.keycode,
      pactinsttime:moment(dataItem.actinstdate).format('YYYY-MM-DD HH:mm:ss') ,
      actinststate:1070,
      approvedpersioncode: this.comservices.getUserCode
    } 

    this.dataServices.tapprovedList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        dataItem.approved = result.data[0]
        console.log(result)
        if(dataItem.approved.isvalid == 2){
          dataItem.active = 2
        }
      }
    })
  }


  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  editItem(item){
    var data = {HeadText:'评审报告',itemdata:item}
    const modal = this.modalHelper.create(ApprovedZsysComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  ReadData(item){
    var data = {HeadText:'合伙人档案',itemdata:item}
    const modal = this.modalHelper.create(HhrAchivedComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}


