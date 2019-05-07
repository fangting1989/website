import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
@Component({
  selector: 'app-hhr-comtinueedit',
  templateUrl: './hhr-comtinueedit.component.html',
  styleUrls: ['./hhr-comtinueedit.component.scss']
})
export class HhrComtinueeditComponent implements OnInit {
  data: any;
  model: any = {}
  f:any = {}
  seladdress:any;
  EnterPriseCode: any;
  submitting:any = false;
  dataitem:any={}
  ConfigData:any = {}
  LXRArray:any = []
  DataList:any = []
  PageNum:any = 0;
  PageSize:any = 0;
  TotalCount:any = 0;
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
    this.ConfigData = WebConfig.hhr
    // this.values = ''
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
    this.InitData();
  }

  InitData(){
    //创建时间
    this.dataitem.createdate = moment().format('YYYY-MM-DD')
    //推荐人
    this.dataitem.tjr = this.comservices.getUserName
    //至少一个
    this.LXRArray.push({lxrid:UUID.UUID(),lxfsid:UUID.UUID()})
  }

  loadData(){
    
  }
  //加载资金情况
  loadZj(){

  }  

  onCustomSelected(e){
    var Address = '';
    var codeAddress = ''
    _.each(e.paths,item=>{
      Address += (Address == ''?'':',') + item.name
      codeAddress +=  (codeAddress == ''?'':',') + item.id
    })
    this.model.region = Address
  }

  saveClick() {
    var self = this;
    //推荐人信息
    this.model.pname = this.comservices.getUserName;
    this.model.pid = this.comservices.getUserCode;
    this.model.enterpriseid = this.comservices.getEnterPrise;
    //业务政绩
    this.model.ynxc = this.ConfigData.one.xc;
    this.model.ynesc = this.ConfigData.one.esc;
    this.model.enxc = this.ConfigData.two.xc;
    this.model.enesc = this.ConfigData.two.esc;
    //录入获得
    this.model.fromtype = 1;
    this.model.listlinkpartner = []
    //区域负责人
    _.each(this.LXRArray,function(it){
      if(!Utils.IsStringNullOrEmpty(it.name) && !Utils.IsStringNullOrEmpty(it.telphone)){
        self.model.listlinkpartner.push({name:it.name,telphone:it.telphone});
      }
    })
    if(this.model.listlinkpartner.length == 0){
      this.msg.error("请输入对应的联系人");
      return
    }
   
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tpartnerUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    } else {
      this.dataServices.tpartnerSave(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
          self.closeModal();
        }
      })
    }
  }

  ItemAdd(){
    this.LXRArray.push({lxrid:UUID.UUID(),lxfsid:UUID.UUID()})
  }
  ItemDel(item){
    var self  = this;
    var index = _.findIndex(self.LXRArray, function(it){
      return it.lxrid == item.lxrid
    })
    console.log(index)
    if (index > -1) {
      self.LXRArray.splice(index, 1);
      self.LXRArray = self.LXRArray.slice();
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
