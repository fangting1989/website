import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import { _ } from 'underscore'
import { Utils } from './../../../../../../../shared/utils/utils';
import * as moment from 'moment'

@Component({
  selector: 'app-partnerwork-edit',
  templateUrl: './partnerwork-edit.component.html',
  styleUrls: ['./partnerwork-edit.component.scss']
})
export class PartnerworkEditComponent implements OnInit {
  EnterPriseCode: any;
  data:any;
  model: any = {}
  selectDate: any;
  cardkeycode:any = null;
  ProinstList: any;
  dateFormat = 'yyyy-MM-dd';
  submitting: any = false
  dataItem: any = {}
  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService: NzModalService
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
  }

  DateChange(e) {
    if (e.length == 2) {
      this.model.workstartdate = moment(e[0]).format('YYYY-MM-DD')
      this.model.workenddate = moment(e[1]).format('YYYY-MM-DD')
    }
  }
  SubmitClick() {
    if (this.submitting) {
      return
    }
    if(this.cardkeycode){
      this.msg.info("对不起，您已经保存过了,如果需要打印，请关闭窗体点击打印");
      return;
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    //更新时间
    var postData = {
      workstartdate:this.model.workstartdate,
      workenddate:this.model.workenddate,
      workstate:1,
      keycode:this.dataItem.keycode
    }
    this.dataServices.tpartnerUp(postData).subscribe(result => {
      if(!result){
        this.msg.error("更新错误")
      }
    })
   
    this.model.objectcode = this.dataItem.keycode
    this.model.objectmark = 'partner'
    this.dataServices.tbankcardIn(this.model).subscribe(result => {
      if (result != null) {
        self.model = result.data;
        self.cardkeycode = result.data.keycode
        self.msg.success("操作成功!");
        self.downloadFile(); 
      }
    })
  }

  cancelClick() {
    this.closeModal(false);
  }

  closeModal(type) {
    this.modal.close(type);
    this.modal.destroy();
  }

  downloadFile(){
    var self = this;
    var loading = this.msg.info("正在下载文档..")
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      dealperson:this.comservices.getUserName,
      keycode:this.dataItem.keycode
    }
    this.dataServices.yjd_download(postData).subscribe(result => {
      this.submitting = false 
      self.msg.remove(loading.messageId)
      if(result){
        window.location =WebConfig.BaseUrl + WebConfig.RequestUrl.dpworkservice + result.data
      }
      self.closeModal(true)
    })
  }
}
