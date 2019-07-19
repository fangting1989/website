

import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../../../services';
import { Enums } from './../../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../../shared/services';
@Component({
  selector: 'app-edit-bzj',
  templateUrl: './edit-bzj.component.html',
  styleUrls: ['./edit-bzj.component.scss']
})
export class EditBzjComponent implements OnInit {
  data: any;
  model: any = {}
  dataItem:any;
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices
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

  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.tbzjList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }*/

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    this.model.oldmoney = '原:yxj:'+this.dataItem.yxj + ",jbbzj:"+this.dataItem.jbbzj + ",zlbzj:"+this.dataItem.zlbzj
    this.model.person = this.comservices.getUserName;
    this.model.partnerid = this.dataItem.keycode,
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.dataServices.tbzjIn(this.model).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.model = result.data;
        self.msg.success("操作成功!");
        self.closeModal(self.model );
      }
    })
  }

  cancelClick() {
    this.closeModal(false);
  }

  closeModal(obj) {
    this.modal.close(obj);
    this.modal.destroy();
  }
}

