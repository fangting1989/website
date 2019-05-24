import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { Utils } from './../../../../../shared/utils/utils';
import { comservices } from '../../../../../shared/services';
@Component({
  selector: 'app-workflow-rollback',
  templateUrl: './workflow-rollback.component.html',
  styleUrls: ['./workflow-rollback.component.scss']
})
export class WorkflowRollbackComponent implements OnInit {
  @Input()  task:any;
  data: any;
  model: any = {}
  EnterPriseCode: any;
  errText:any = "对不起，没有找到可驳回的环节。";
  HisDataList:any = []
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
        this.data.HeadText = "驳回"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
      }
    }
    this.loadData();
  }

  loadData(){
    var postData = {
      taskid: this.data.itemdata.taskId
    }
    this.dataServices.hisprocesstask(postData).subscribe(result => {
      this.submitting = false
      this.HisDataList = result.data;
      //默认选择第一个
      if(this.HisDataList.length > 0){
        this.model.targetNodeId = this.HisDataList[0].activityid
      }
    })

  }

  targetChanged(event){
    console.log(event)
  }

  saveClick() {
    if(this.submitting){
        return
    }
    if(Utils.IsStringNullOrEmpty(this.model.approvedcontent)){
      this.msg.error("请填写驳回意见")
      return;
    }
    this.submitting = true;
    var self = this;
    var postData = {
      taskid:this.data.itemdata.taskId,
      dist_flowelementid:this.model.targetNodeId,
      usercode:this.comservices.getUserCode,
      username:this.comservices.getUserName,
      approvedcontent:this.model.approvedcontent,
    }

    this.dataServices.rollbacktask(postData).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.msg.success("驳回成功!");
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
