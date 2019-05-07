import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../shared/services';
import * as moment from  'moment'
import {_} from 'underscore'
import { Utils} from './../../../../../../shared/utils/utils';

@Component({
  selector: 'app-tcustomer-edit',
  templateUrl: './tcustomer-edit.component.html',
  styleUrls: ['./tcustomer-edit.component.scss']
})
export class TCustomerEditComponent implements OnInit {
  data: any;
  model: any = {}
  seladdress:any;
  EnterPriseCode: any;
  submitting:any = false;
  regionPlaceHolder:any = "请选择..."
  chinaCity:any
  values:any;
  // values:any;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  opt:any; 
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise

    this.seladdress = '' 
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
    this.regionPlaceHolder = this.model.region == null?'请选择..':this.model.region
    this.chinaCity = chinaCity;
  }
  citySelect(e){
    _.each(e.option.children,it=>{
      if(!it.children){
        it.isLeaf = true
      }
    })
  }
  onCustomSelected(e){
    var Address = '';
    var codeAddress = ''
    _.each(e,item=>{
      Address += (Address == ''?'':',') + item
    })
    this.model.region = Address
  }

  saveClick() {


    //判断条件
    if(Utils.IsStringNullOrEmpty(this.model.customername)){
      this.msg.error("请填写客户名称")
      return;
    }

    //判断条件
    if(Utils.IsStringNullOrEmpty(this.model.customertel)){
      this.msg.error("请填写客户电话")
      return;
    }

    if(Utils.IsStringNullOrEmpty(this.model.region)){
      this.msg.error("请填写区域信息")
      return;
    }


    // return;
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tcustomerUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal(self.model );
        }
      })
    } else {
      this.model.fromtype = 1
      this.model.customertype = 1
      //锁定用户
      this.model.isvalid = 2
      this.model.lockUserID = this.comservices.getUserCode
      this.model.lockUserDate =moment()
      this.model.pid =  this.comservices.getUserCode
      this.model.pname = this.comservices.getUserName
      this.model.ptype = 'partner'
      this.dataServices.tcustomerIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal(self.model);
        }
      })
    }
  }

  cancelClick() {
    this.closeModal(false);
  }

  closeModal(data) {
    this.modal.close(data);
    this.modal.destroy();
  }
}
