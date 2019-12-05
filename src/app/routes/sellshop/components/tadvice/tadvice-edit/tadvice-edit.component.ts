import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'sellsiteservice-tadvice-edit',
  templateUrl: './tadvice-edit.component.html',
  styleUrls: ['./tadvice-edit.component.scss']
})
export class TAdviceEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route:ActivatedRoute
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
        if(this.model.picontent){
          try{
            this.model.picontentdata = JSON.parse(this.model.picontent).images
          }catch(e){
            this.model.picontentdata = {}
          }
          
        }
        console.log(this.model)
      }
    }
  }

  saveClick() {
    // if(this.submitting){
    //     return
    // }
    // this.submitting = true;
    // var self = this;
    // this.model.enterpriseid = this.EnterPriseCode
    // if (this.model.keycode) {
    //   this.dataServices.tadviceUp(this.model).subscribe(result => {
    //     this.submitting = false
    //     if (result != null) {
    //       self.model = result.data;
    //       self.msg.success("操作成功!");
    //       self.closeModal();
    //     }
    //   })
    // } else {
    //   this.dataServices.tadviceIn(this.model).subscribe(result => {
    //     this.submitting = false
    //     if (result != null) {
    //       self.model = result.data;
    //       self.msg.success("操作成功!");
    //       self.closeModal();
    //     }
    //   })
    // }
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }
}
