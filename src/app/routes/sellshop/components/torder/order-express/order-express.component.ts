import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
@Component({
  selector: 'app-order-express',
  templateUrl: './order-express.component.html',
  styleUrls: ['./order-express.component.scss']
})
export class OrderExpressComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  ExpressMsgList:any = [];
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
    this.loadData();
  }

  loadData(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      keycode:this.model.keycode
    }
    this.dataServices.orderexpress(postData).subscribe(result => {
      if(result){
        try{
          var ExpressInfo =  JSON.parse(result.data);
          this.ExpressMsgList = ExpressInfo.Traces
          console.log(this.ExpressMsgList)
        }catch(ex){

        }
      }
    })
    
  }


  saveClick() {
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    var postData = {
      keycode:this.model.keycode,
      zipunit:this.model.zipunit,
      zipcode:this.model.zipcode,
      orderisvalid:20, 
      enterpriseid:this.EnterPriseCode
    }
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
