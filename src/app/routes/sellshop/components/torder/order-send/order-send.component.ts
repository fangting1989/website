import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import {_} from 'underscore';
@Component({
  selector: 'app-order-send',
  templateUrl: './order-send.component.html',
  styles: []
})
export class OrderSendComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  ExpressDataList:any = [];
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
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
      }
    }
    this.model.selected = false;

    this.loadExpress();
  }

  /*loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.dataServices.torderList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
       }
     })
  }*/

  //加载快递公司
  loadExpress(){
      var self = this;
      var postData:any = {
        pagesize:500,
        pagenum:1,
        isvalid:1,
        enterpriseid: this.EnterPriseCode
      }
      this.dataServices.texpressList(postData).subscribe(result => {
        if (result != null) {
          self.ExpressDataList = result.data;
        }
      })
  }
  
  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;

   

    var postData:any = {
      keycode:this.model.keycode,
      zipunit:this.model.zipunit,
      zipcode:this.model.zipcode,
      orderisvalid:20, 
      enterpriseid:this.EnterPriseCode
    }
    _.each(this.ExpressDataList,it=>{
      if(it.expressname == this.model.zipunit){
        postData.zipcode = it.expresscode
      }
    })
    if (postData.keycode) {
      this.dataServices.torderUp(postData).subscribe(result => {
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
