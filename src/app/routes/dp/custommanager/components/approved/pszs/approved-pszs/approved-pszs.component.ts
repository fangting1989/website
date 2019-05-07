import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import {TurnbackComponent} from  '../../common/turnback/turnback.component'
import { ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-approved-pszs',
  templateUrl: './approved-pszs.component.html',
  styleUrls: ['./approved-pszs.component.scss']
})
export class ApprovedPszsComponent implements OnInit {
  data: any;
  dataItem: any = {}
  model: any = {}
  modelzx:any = {}
  modelyj:any ={}
  EnterPriseCode: any;
  submitting:any = false;
  AdviceList:any = []
  // values:any;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  opt:any; 
  constructor(private msg: NzMessageService,
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
    this.InitData();
    this.loadApproved()
  }

  InitData(){
    this.loadzsysApproved();
  }


  loadzsysApproved(){
    var self = this;
    var postData = {
      enterpriseid: this.EnterPriseCode,
      partnercode:this.dataItem.keycode,
    }
    this.dataServices.advice_spys(postData).subscribe(result => {
      if (result != null && result.data.length) {
        console.log(result)
        this.AdviceList = result.data
      }
    })
  }

  loadApproved(){
    var self = this;
    var postData = {
      pagesize:1,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode,
      pactinsttime:moment(this.dataItem.actinstdate).format('YYYY-MM-DD HH:mm:ss') ,
      actinststate:this.dataItem.isvalid,
      approvedpersioncode: this.comservices.getUserCode
    }

    this.dataServices.tapprovedList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        
        this.modelyj = result.data[0]
      }
    })
  }

  saveClick() {
    this.modelyj.tablename = 'partner'
    this.modelyj.tableid = this.dataItem.keycode;
    this.modelyj.approvedtype = 1000;
    this.modelyj.actinsttime = this.dataItem.actinstdate
    this.modelyj.actinststate  = this.dataItem.isvalid
    this.modelyj.approvedpersion = this.comservices.getUserName
    this.modelyj.approvedpersioncode = this.comservices.getUserCode
    var self = this;
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.modelyj.enterpriseid = this.EnterPriseCode
    if (this.modelyj.keycode) {
      this.dataServices.tapprovedUp(this.modelyj).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.modelyj = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.modelyj.partnerid = this.dataItem.keycode
      this.modelyj.isvalid = 1
      this.dataServices.tapprovedIn(this.modelyj).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.modelyj = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

  ProinstBack(){
    var self = this;
    var data = {HeadText:'驳回信息',itemdata:this.dataItem}
    const modal = this.modalHelper.create(TurnbackComponent,{ data: data},{size:500}).subscribe(res => {
        if(res){
          self.closeModal();
        }
    });
  }
  RefusePass(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否真的拒绝该申请?</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          partnerkeycode:self.dataItem.keycode, 
          enterpriseid:self.EnterPriseCode,
          dealPerson:self.comservices.getUserName,
          dealCode:self.comservices.getUserCode,
          isvalid:self.dataItem.isvalid
        }
        self.dataServices.refusepass(postData).subscribe(result => {
          if (result != null) {
           self.msg.success("提交成功!");
           self.closeModal();
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
  ProinstSubmit(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定提交到下一环节?</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          partnerkeycode:self.dataItem.keycode, 
          enterpriseid:self.EnterPriseCode,
          dealPerson:self.comservices.getUserName,
          dealCode:self.comservices.getUserCode,
        }
        console.log(self.dataServices.tpartnerzxtj)
        self.dataServices.tpartnerpszstg(postData).subscribe(result => {
          if (result != null) {
           self.msg.success("提交成功!");
           self.closeModal();
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
}
