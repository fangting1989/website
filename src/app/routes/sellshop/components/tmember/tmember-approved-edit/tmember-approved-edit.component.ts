import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tmember-approved-edit',
  templateUrl: './tmember-approved-edit.component.html',
  styleUrls: ['./tmember-approved-edit.component.scss']
})
export class TmemberApprovedEditComponent implements OnInit {
  data: any;
  model: any = {
    isvalid:1
  }
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
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
        this.data.HeadText = "认证审核"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
      }
      console.log(this.model) 
    }
    this.model.selected = false;
  }

  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.texpressList(this.model).subscribe(result => {
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
    var postData = {
      memberid:this.model.memberid,
      keycode:this.model.keycode,
      enterpriseid:this.comservices.getEnterPrise,
      memtype:'30',
    }
    this.dataServices.tmemberUp(postData).subscribe(result => {
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
