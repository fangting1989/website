import { Component, OnInit,Input,ElementRef } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ModalHelper } from '@delon/theme';
import {GlobalState} from '../../../../core/common';
import { dataServices } from '../../services';
import {_} from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
import { comservices,dataServices as baseservice } from '../../../../shared/services';

@Component({
  selector: 'dpworksiteservices-loanperson-component',
  templateUrl: './loanperson.component.html',
  styleUrls: ['./loanperson.component.scss']
})
export class LoanpersonbaseComponent implements OnInit {

  @Input() ComponentMode:any = "edit"
  @Input() usertype:any = 10
  @Input() task:any = {}


  model:any = {}
  submitting: any = false;
  EnterPriseCode:any;

  constructor(
    public msg: NzMessageService,
    private modalHelper:ModalHelper,
    private modalService:NzModalService,
    private dataServices:dataServices,
    private comservices:comservices,
    public elementRef:ElementRef,
  ) { }

  ngOnInit() {
  }

  loadData(){
    var self = this;
    var postData = {
      enterpriseid: this.EnterPriseCode,
      procinstid: this.task.processinstanceid,
      usertype:this.usertype
    }
    this.dataServices.tloanpersonList(postData).subscribe(result => {
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
    this.model.usertype = this.usertype
    if (this.model.keycode) {
      this.dataServices.tloanpersonUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.dataServices.tloanpersonIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }


}
