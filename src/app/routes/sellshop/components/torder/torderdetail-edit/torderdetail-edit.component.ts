import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-torderdetail-edit',
  templateUrl: './torderdetail-edit.component.html',
  styleUrls: ['./torderdetail-edit.component.scss']
})
export class TOrderdetailEditComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  orimoney:any = 0;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route:ActivatedRoute,
    private modalService:NzModalService,
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
        this.orimoney = this.model.paymoney
      }
    }
    this.model.selected = false;
  }

  // loadData(){
  //   var self = this;
  //   this.model = {}
  //   this.model.keycode = this.route.snapshot.queryParams["keycode"];
  //   this.dataServices.torderdetailList(this.model).subscribe(result => {
  //     if (result != null && result.data.length > 0) {
  //        self.model = result.data[0];
  //      }
  //    })
  // }

  saveSureClick(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认修改价格</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        self.saveClick();
      }
    })
  }

  saveClick() {
    if(this.submitting){
        return
    }
    var postData = {
      keycode:this.model.keycode,
      enterpriseid:this.comservices.getEnterPrise,
      paymoney:this.model.paymoney,
      orimoney:this.orimoney,
      operatename:this.comservices.getUserName
    }
    this.submitting = true;
    var self = this;
    if (this.model.keycode) { 
      this.dataServices.fixprise(postData).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.msg.success("操作成功!");
          self.closeModal({keycode:self.model.keycode,paymoney:self.model.paymoney});
        }
      })
    } 
  }

  cancelClick() {
    this.closeModal(true);
  }

  closeModal(obj) {
    this.modal.close(obj);
    this.modal.destroy();
  }
}
