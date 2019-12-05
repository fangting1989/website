import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { ModalHelper } from '@delon/theme';
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
    private route:ActivatedRoute,
    private modalHelper:ModalHelper,
    private modalService:NzModalService
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
        //
        this.model.idcardfront = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.idcardfront;
        this.model.idcardback = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.idcardback;
        this.model.rzt = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.rzt;
        this.model.sfrzt = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ this.model.sfrzt;
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
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定该用户审核通过</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        self.save();
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  save(){
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

  UnpassClick(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定该用户审核不通过</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        self.unpass();
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });

    
  }

  unpass(){
    if(this.submitting){
      return
    }
    this.submitting = true;
    var self = this;
    if(this.model.memtype == 25){
      this.model.memtype = 10
    }else if(this.model.memtype == 28){
      this.model.memtype = 27
    }
    var postData = {
      memberid:this.model.memberid,
      keycode:this.model.keycode,
      enterpriseid:this.comservices.getEnterPrise,
      memtype:this.model.memtype,
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
