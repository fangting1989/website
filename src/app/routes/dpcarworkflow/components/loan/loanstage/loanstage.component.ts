import { Component, OnInit,Input,ElementRef,ViewChild } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalHelper } from '@delon/theme';
import {GlobalState} from '../../../../../core/common';
import { dataServices } from '../../../services';
import {_} from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
import { comservices,dataServices as baseservice } from '../../../../../shared/services';
import {WorkflowBaseComponent} from './../../../../../shared/components';

@Component({
  selector: 'dpworksiteservices-loanstage',
  templateUrl: './loanstage.component.html',
  styleUrls: ['./loanstage.component.scss']
})
export class LoanstageComponent extends WorkflowBaseComponent implements OnInit {

  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;

  constructor(
    public msg: NzMessageService,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices,
    public elementRef:ElementRef,
  ) { 
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      enterpriseid: this.EnterPriseCode,
      procinstid: this.task.processinstanceid
    }
    this.dataServices.tloadstageList(postData).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }

  saveClick() {
    //保存内容
    if (this.submitting) {
      return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    this.model.procinstid = this.task.processinstanceid
    if (this.model.keycode) {
      this.dataServices.tloadstageUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.dataServices.tloadstageIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }

}
