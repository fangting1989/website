import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import { ModalHelper } from '@delon/theme';
import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-tx-detail',
  templateUrl: './tx-detail.component.html',
  styleUrls: ['./tx-detail.component.scss']
})
export class TxDetailComponent implements OnInit {
  data: any;
  dataItem: any = {}
  model: any = {}
  seladdress:any;
  EnterPriseCode: any;
  submitting:any = false;
  ConfigData:any = {}
  approvedlist:any = []
  TxDataList:any = []
  // values:any;
 PartName:any = ''
  outmoneyisvalidArray: any = Object.assign([], Enums.outmoneyisvalid);
  opt:any;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    this.ConfigData = WebConfig.hhr
    // this.values = ''
    this.seladdress = '' 
  }

  ngOnInit() {
    var self = this;
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.dataItem = Object.assign({}, this.data.itemdata);
      }
    }
    _.each(self.outmoneyisvalidArray,item=>{
      if(item.value == self.dataItem.isvalid){
        self.PartName = item.partname;
      }
    })
    this.loadApproved();
    
  }
  ngAfterViewInit(){
    //
  }

  loadApproved(){
    var self = this;
    var postData = {
      pagesize:200,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      tableid:this.dataItem.keycode,
      tablename:'outmoney'
    }

    this.dataServices.tapprovedList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        self.approvedlist =  result.data
        _.each(self.outmoneyisvalidArray,item=>{
          _.each(self.approvedlist,dditem =>{
            if(item.value == dditem.actinststate){
              dditem.partname = item.partname;
            }
          })
        })
      }
    })
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

  SubmitClick(){
    if(Utils.IsStringNullOrEmpty(this.model.advice)){
      this.msg.error("请填写意见内容")
      return
    }
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定提交到下一环节?</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          outmoneykeycode:self.dataItem.keycode, 
          enterpriseid:self.EnterPriseCode,
          dealPerson:self.comservices.getUserName,
          dealCode:self.comservices.getUserCode,
          content:self.model.advice,
          passstate:self.dataItem.passstate,
          isvalid:self.dataItem.isvalid
        }
        self.dataServices.toutmoneytxsp(postData).subscribe(result => {
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
