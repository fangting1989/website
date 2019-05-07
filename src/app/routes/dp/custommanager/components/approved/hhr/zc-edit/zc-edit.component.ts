import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-zc-edit',
  templateUrl: './zc-edit.component.html',
  styleUrls: ['./zc-edit.component.scss']
})
export class ZcEditComponent implements OnInit {
  data: any;
  model: any = {}
  dataItem:any;
  seladdress:any;
  EnterPriseCode: any;
  submitting:any = false;
  dataitem:any={}
  ConfigData:any = {}
  LXRArray:any = []
  DBRArray:any = []
  regionPlaceHolder:any = "请选择..."
  chinaCity:any
  values:any;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  partnertypeArray: any = Object.assign([], Enums.partnertypeArray);
  dzqkArray: any = Object.assign([], Enums.dzqkArray);
  dzfArray: any = Object.assign([], Enums.dzfArray);
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    // this.values = ''
    this.seladdress = '' 
  }

  ngOnInit() {
    this.chinaCity = chinaCity;
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        this.dataItem = this.model
      }
    }
    this.model.selected = false;
    if(!this.model.partnertype){
      this.model.partnertype = 1
      this.model.fxcdbl = 100
      this.model.dzqk = 1
      this.model.dzf = 1
    }
    this.InitData();
    //如果为个人，加载对应的内容
    this.loadLinkpartnerList();
  }

  InitData(){
    //创建时间
    this.dataitem.createdate = moment().format('YYYY-MM-DD')
    //推荐人
    this.dataitem.tjr = this.comservices.getUserName
    //至少一个
    this.LXRArray.push({lxrid:UUID.UUID(),lxfsid:UUID.UUID()})
    //至少一个
    this.DBRArray.push({dbrid:UUID.UUID(),dbrlxfsid:UUID.UUID()})
    this.regionPlaceHolder = this.model.region == null?'请选择..':this.model.region
    //默认配置
    this.ConfigData = WebConfig.hhr[this.model.fxcdbl]
  }

  loadLinkpartnerList(){

    if(!this.model.keycode){
        return;
    }
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.model.keycode
    }
    this.dataServices.tlinkpartnerList(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length >0){
          _.each(result.data,item=>{
            item.lxrid = UUID.UUID()
            item.lxfsid = UUID.UUID()
            item.dbrid =  UUID.UUID()
            item.dbrlxfsid =  UUID.UUID()
          })
          this.LXRArray = _.filter(result.data,it=>{return it.linktype == 1});
          this.DBRArray = _.filter(result.data,it=>{return it.linktype == 2});
        }
      }
    })
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

  saveClick(state) {
    var self = this;
    
    this.model.savestate = state 
    //推荐人信息
    this.model.pname = this.comservices.getUserName;
    this.model.pid = this.comservices.getUserCode;
    this.model.enterpriseid = this.comservices.getEnterPrise;
    //业务政绩
    this.model.ynxc = this.ConfigData.one.xc;
    this.model.ynesc = this.ConfigData.one.esc;
    this.model.enxc = this.ConfigData.two.xc;
    this.model.enesc = this.ConfigData.two.esc;
    // if(Utils.IsStringNullOrEmpty(this.model.region)){
    //   this.model.region = 
    // }
    //录入获得
    this.model.fromtype = 1;
    this.model.listlinkpartner = []
    //当为个人的情况才有负责人
    if(this.model.partnertype == 1){
      //区域负责人
      _.each(this.LXRArray,function(it){
        if(!Utils.IsStringNullOrEmpty(it.name) && !Utils.IsStringNullOrEmpty(it.telphone)){
          self.model.listlinkpartner.push({linktype:1,name:it.name,telphone:it.telphone,keycode:it.keycode});
        }
      })
      if(this.model.listlinkpartner.length == 0){
        this.msg.error("请输入对应的联系人");
        return
      }
      this.model.fr = '';
      this.model.lxdh = '';
      this.model.qymc = '';
      //申请人名称及联系方式取一个
      this.model.partnername = this.LXRArray[0].name
      this.model.telephone = this.LXRArray[0].telphone
    }else{
      //如果为法人
      this.model.partnername =this.model.fr
      this.model.telephone = this.model.lxdh;
    }
    //担保人
    _.each(this.DBRArray,function(it){
      if(!Utils.IsStringNullOrEmpty(it.name) && !Utils.IsStringNullOrEmpty(it.telphone)){
        self.model.listlinkpartner.push({linktype:2,name:it.name,telphone:it.telphone,keycode:it.keycode});
      }
    })

    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.yxj = 0
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tpartnerSave(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          if(state == 1005){
            self.submitFun();
          }else{
            self.msg.success("操作成功!");
            self.closeModal();
          }
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

  DBRItemAdd(){
    this.DBRArray.push({dbrid:UUID.UUID(),dbrlxfsid:UUID.UUID()})
  }
  ItemDel(item,type){
    var self  = this;
    if(item.keycode){
      var self = this;
      this.modalService.confirm({
        nzTitle     : '提示',
        nzContent   : '<b style="color: red;">是否确认删除对象</b>',
        nzOkText    : '确定',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          var postData = {
            keycode:item.keycode
          }
          self.dataServices.tlinkpartnerDel(postData).subscribe(result => {
            if (result != null) {
              if(type ==1){
                self.msg.success("删除成功!");
                var index = _.findIndex(self.LXRArray, function(it){
                  return it.lxrid == item.lxrid
                })
                if (index > -1) {
                  self.LXRArray.splice(index, 1);
                  self.LXRArray = self.LXRArray.slice();
                }
              }else{
                self.msg.success("删除成功!");
                var index = _.findIndex(self.DBRArray, function(it){
                  return it.dbrid == item.dbrid
                })
                if (index > -1) {
                  self.DBRArray.splice(index, 1);
                  self.DBRArray = self.DBRArray.slice();
                }
              }
            }
          })
        },
        nzCancelText: '取消',
        nzOnCancel  : () => {

        }
      });
    }else{
      if(type == 1){
        var index = _.findIndex(self.LXRArray, function(it){
          return it.lxrid == item.lxrid
        })
        if (index > -1) {
          self.LXRArray.splice(index, 1);
          self.LXRArray = self.LXRArray.slice();
        }
      }else{
        var index = _.findIndex(self.DBRArray, function(it){
          return it.dbrid == item.dbrid
        })
        if (index > -1) {
          self.DBRArray.splice(index, 1);
          self.DBRArray = self.DBRArray.slice();
        }
      }
      
    }

  }

  SubmitClick(){

    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定提交到下一环节?</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.saveClick('1005')
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
    
  }

  submitFun(){
    var self = this;
    //提交信息
    var postData = {
      partnerkeycode:self.model.keycode, 
      enterpriseid:self.EnterPriseCode,
      dealPerson:self.comservices.getUserName,
      dealCode:self.comservices.getUserCode,
    }
    self.dataServices.xgzc(postData).subscribe(result => {
      if (result != null) {
      self.msg.success("提交成功!");
      self.closeModal();
      }
    })
  }

  Change_cdbl(e){
    this.ConfigData = WebConfig.hhr[e]
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }
}

