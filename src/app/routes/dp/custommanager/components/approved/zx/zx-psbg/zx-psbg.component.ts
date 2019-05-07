import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { ModalHelper } from '@delon/theme';
import {TurnbackComponent} from  '../../common/turnback/turnback.component'

@Component({
  selector: 'app-zx-psbg',
  templateUrl: './zx-psbg.component.html',
  styleUrls: ['./zx-psbg.component.scss']
})
export class ZxPsbgComponent implements OnInit {
  data: any;
  dataItem: any = {}
  model: any = {}
  modelzx:any = {};
  seladdress:any;
  EnterPriseCode: any;
  submitting:any = false;
  ConfigData:any = {}
  LXRArray:any = []
  ProinstList:any = []
  UserName:any;
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
    // this.values = ''
    this.seladdress = ''
    this.UserName = this.comservices.getUserName 
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
    this.model.shf = this.UserName
    this.InitData();
  }

  InitData(){
    
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
        self.dataServices.tpartnertxpsbg(postData).subscribe(result => {
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
