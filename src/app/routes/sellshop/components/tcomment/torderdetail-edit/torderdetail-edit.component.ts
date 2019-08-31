import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-torderdetail-comment-edit',
  templateUrl: './torderdetail-edit.component.html',
  styleUrls: ['./torderdetail-edit.component.scss']
})
export class TOrderdetailCommentEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting: any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route: ActivatedRoute
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
          this.model.commentdetail = JSON.parse(this.model.commentdetail)
        } catch (e) {

        }
      }
      console.log(this.model)
    }
  }

  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.torderdetailList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }*/

  DataChanged(event) {
    if (this.submitting) {
      return
    }
    this.submitting = true;
    var self = this;
    var postData = {
      keycode: this.model.keycode,
      enterpriseid: this.comservices.getEnterPrise,
      commentisvalid: event
    }
    this.dataServices.torderdetailUp(postData).subscribe(result => {
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
