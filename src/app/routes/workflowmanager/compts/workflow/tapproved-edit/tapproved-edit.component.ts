import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { Utils } from './../../../../../shared/utils/utils';
import { comservices } from '../../../../../shared/services';
@Component({
  selector: 'app-tapproved-edit',
  templateUrl: './tapproved-edit.component.html',
  styleUrls: ['./tapproved-edit.component.scss']
})
export class TApprovedEditComponent implements OnInit {
  @Input()  task:any;
  data: any;
  model: any = {}
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
        this.data.HeadText = "审核意见"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
      }
    }
    console.log(this.data.itemdata)
  }

  saveClick() {
    if(this.submitting){
        return
    }
    if(Utils.IsStringNullOrEmpty(this.model.approvedcontent)){
      this.msg.error("请填写审批意见")
      return;
    }
    this.submitting = true;
    var self = this;
    this.model.taskid = this.data.itemdata.taskId;
    this.model.approvedtype = 2000;
    this.model.username= this.comservices.getUserName
    this.model.usercode = this.comservices.getUserCode
    this.model.processinstanceid = this.data.itemdata.processinstanceid;

    this.dataServices.task_finishcurrtask(this.model).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.model = result.data;
        self.msg.success("操作成功!");
        self.closeModal(true);
      }
    })
  }

  cancelClick() {
    this.closeModal(false);
  }

  closeModal(flag) {
    this.modal.close(flag);
    this.modal.destroy();
  }
}
