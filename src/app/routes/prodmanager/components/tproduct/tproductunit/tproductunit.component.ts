import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { prodServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';

@Component({
  selector: 'app-tproductunit',
  templateUrl: './tproductunit.component.html',
  styleUrls: ['./tproductunit.component.scss']
})
export class TproductunitComponent implements OnInit {

  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: prodServices,
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
        console.log(this.model)
      }
    }
    this.model.selected = false;
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    this.dataServices.tproductunitIn(this.model).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.model = result.data;
        self.msg.success("操作成功!");
        self.closeModal()
      }
    })
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(this.model);
    this.modal.destroy();
  }

}
