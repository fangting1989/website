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
  selector: 'app-hhr-achived',
  templateUrl: './hhr-achived.component.html',
  styleUrls: ['./hhr-achived.component.scss']
})
export class HhrAchivedComponent implements OnInit {
  data: any;
  dataItem: any = {}
  model: any = {}
  modelps:any = {}
  EnterPriseCode: any;
  submitting:any = false;
  ConfigData:any = {}
  LXRArray:any = []
  ProinstList:any = []
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
    this.ConfigData = WebConfig.hhr
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
    this.loadData();
  }

  InitData(){
    
  }

  loadData(){
    var self = this; 
    var postData = {
      pagesize:1,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode
    }
    this.dataServices.tpsreportList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        this.modelps = result.data[0]
      }
    })
  }

  
  saveClick() {
    var self = this;
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tcreditmsgUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.model.partnerid = this.dataItem.keycode
      this.dataServices.tcreditmsgIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
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
        self.dataServices.tpartnerpsbgys(postData).subscribe(result => {
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

