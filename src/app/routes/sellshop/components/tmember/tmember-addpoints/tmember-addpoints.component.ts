import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import {_} from 'underscore';
@Component({
  selector: 'app-tmember-addpoints',
  templateUrl: './tmember-addpoints.component.html',
  styleUrls: ['./tmember-addpoints.component.scss']
})
export class TmemberAddpointsComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  PointsList:any = [];
  itemdata:any;
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
    this.dataServices.tpointdetailList(postData).subscribe(result => {
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
      points:this.model.points,
      pointdesc:'后台'+this.comservices.getUserName + "添加",
      content:'后台添加',
      isvalid:1,
    }
   
    this.dataServices.tpointdetailIn(postData).subscribe(result => {
      this.submitting = false
      if (result != null) {
        self.msg.success("操作成功!");
        delete this.model.points
        this.loadPoints();
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

