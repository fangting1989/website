import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../../services';
import { Enums } from './../../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import { _ } from 'underscore'
import { Utils } from './../../../../../../../../shared/utils/utils';
import * as moment from 'moment'

@Component({
  selector: 'app-edit-bankcard',
  templateUrl: './edit-bankcard.component.html',
  styleUrls: ['./edit-bankcard.component.scss']
})
export class EditBankcardComponent implements OnInit {
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
        this.model = this.dataItem
      }
    }
  }

  SaveClick() {
    

    if (this.submitting) {
      return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode;
    // this.model.objectcode = this.dataItem.keycode
    // this.model.objectmark = 'partner'
    this.dataServices.tbankcardUp(this.model).subscribe(result => {
      if (result != null) {
        self.model = result.data;
        self.cardkeycode = result.data.keycode
        self.msg.success("操作成功!");
        self.closeModal(self.model)
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
}

