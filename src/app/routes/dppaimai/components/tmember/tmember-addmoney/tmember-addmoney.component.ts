import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import {GlobalState} from '../../../../../core/common/global.state';
import {_} from 'underscore';
@Component({
  selector: 'app-tmember-addmoney',
  templateUrl: './tmember-addmoney.component.html',
  styleUrls: ['./tmember-addmoney.component.scss']
})
export class TmemberAddmoneyComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  PointsList:any = [];
  itemdata:any;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private GlobalState:GlobalState
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.itemdata = Object.assign({}, this.data.itemdata);
      }
    }
    this.loadPoints();
  }

  loadPoints(){
    if(!this.itemdata.keycode){
      this.msg.error("参数错误");
      return;
    }
    var postData = {
      memberid:this.itemdata.keycode,
      enterpriseid:this.comservices.getEnterPrise,
      pagesize:1000,
    }
    this.dataServices.tpaydetailList(postData).subscribe(result => {
      if(result){
        this.PointsList = result.data;
        _.each(this.PointsList,it=>{
          
        })
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
      memberid:this.itemdata.keycode,
      enterpriseid:this.EnterPriseCode,
      amount:this.model.amount,
      content:'后台'+this.comservices.getUserName + "添加",
      isvalid:1,
    }
   
    this.dataServices.tpaydetailIn(postData).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.msg.success("操作成功!");
        delete this.model.points
        this.loadPoints();
        //重新加载数据
        this.GlobalState.notifyDataChanged("reflashuserdata",{eventname:'reload'})
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

