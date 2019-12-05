
import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { defaultServices } from '../../../../services/defaultService';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  model: any = {}
  EnterPriseCode:any = {}
  submitting:any = false;
  data:any = {};
  dataItem:any = {}
  constructor(private msg: NzMessageService,
    private dataServices: defaultServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    console.log(this.data)
    if(this.data.itemdata){
      this.dataItem = this.data.itemdata 
    }
  }

  saveClick() {
    var self = this;
    if(Utils.IsStringNullOrEmpty(this.model.oldpwd) || Utils.IsStringNullOrEmpty(this.model.newpwd) || Utils.IsStringNullOrEmpty(this.model.confirm_newpwd) ){
      this.msg.error("请输入正确的信息!");
      return;
    }
    if(this.model.newpwd !== this.model.confirm_newpwd){
      this.msg.error("两次密码不一致!");
      return;
    }
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    this.model.username = this.comservices.getUserName
    this.model.keycode = this.comservices.getUserCode
    this.dataServices.changePwd(this.model).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.model = result.data;
        self.msg.success("操作成功!");
        self.closeModal();
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
}
