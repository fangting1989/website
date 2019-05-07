import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { payServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
@Component({
  selector: 'app-payconfigedit',
  templateUrl: './payconfigedit.component.html',
  styleUrls: ['./payconfigedit.component.scss']
})
export class PayconfigeditComponent implements OnInit {
  data: any;
  model: any = {}
  submitting:any = false;
  EnterPriseCode: any;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private payServices: payServices,
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
        this.model = Object.assign({}, this.data.itemdata);
        try {
          this.model.paytype = parseInt(this.model.paytype)
        } catch (e) {

        }

      }
    }
    this.model.selected = false;
  }

  saveClick() {
    var self = this;
    if(this.submitting){
      return 
    }
    this.submitting = true;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.payServices.payconfigUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.payServices.payconfigIn(this.model).subscribe(result => {
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
}
