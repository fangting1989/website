import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from '../../../../../shared/utils/enums';
import { comservices} from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'flowableworkflow-tprocessconfig-edit',
  templateUrl: './tprocessconfig-edit.component.html',
  styleUrls: ['./tprocessconfig-edit.component.scss']
})
export class TProcessconfigEditComponent implements OnInit {
  data: any;
  model: any = {} 
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route:ActivatedRoute
  ) {
    
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        this.model.defproceeid = this.model.processId
        this.loadData();
      }
    }
  }

  loadData(){
    var self = this;
    var postData = {
      defproceeid:this.model.processId
    }
    this.dataServices.tprocessconfigList(postData).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
    })
  }

  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    if (this.model.keycode) {
      this.dataServices.tprocessconfigUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.tprocessconfigIn(this.model).subscribe(result => {
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
