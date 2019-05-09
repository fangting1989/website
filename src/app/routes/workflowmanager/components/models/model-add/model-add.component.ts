import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-model-add',
  templateUrl: './model-add.component.html',
  styleUrls: ['./model-add.component.scss']
})
export class ModelAddComponent implements OnInit {
  model: any = {}
  EnterPriseCode:any = {}
  submitting:any = false;
  data:any;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    
  }

  saveClick() {
    var self = this;
    if(Utils.IsStringNullOrEmpty(this.model.name) || Utils.IsStringNullOrEmpty(this.model.key) ){
      this.msg.error("请输入正确的信息!");
      return;
    }
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.modelType = 0
    this.dataServices.model_create(this.model).subscribe(result => {
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
