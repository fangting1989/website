import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../../core/common';
import { dataServices } from '../../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService,
  NzModalRef
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../../shared/services';

@Component({
  selector: 'app-fpproinst',
  templateUrl: './fpproinst.component.html',
  styleUrls: ['./fpproinst.component.scss']
})
export class FpproinstComponent implements OnInit {
  data:any;
  datamodel:any;
  DataList:any = []
  CurrItem:any = null;
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  submitting = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  CustomType:any = [{name:'潜力客户',value:1},{name:'意向客户',value:2}]
  ShowMore:any = false
  allChecked:any = false

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private modal: NzModalRef,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "分配"
      }
      if (this.data.itemdata) {
        this.datamodel = Object.assign({}, this.data.itemdata);
      }
    }
    console.log(this.datamodel)
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      roleid:WebConfig.rolecode.zxsh,
      enterpriseid:this.EnterPriseCode
    }
    this.dataServices.findUserObjectByRole(postData).subscribe(result => {
      if(result){
        this.DataList = result.data
        var userarray = ""
        _.each(this.DataList,it=>{
          userarray += (userarray == ""?"":",") +it.keycode 
        })
        self.loadUserWorkCount(userarray,"1020,1025,1030,1050")
      }
    })
    
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }


  refreshStatus(item){
    _.each(this.DataList,it=>{
      it.active = false;
    })
    item.active = true;
    this.CurrItem = item
  }

  SureClick(){
    if(!this.CurrItem){
      this.msg.error("请选择..")
      return;
    }
    if(this.submitting){
      return
    }
    this.submitting = true
    //派件
    var postData = {
      enterpriseid:this.EnterPriseCode,
      dealPerson:this.comservices.getUserName,
      dealCode:this.comservices.getUserCode,
      codearray:this.datamodel.codeArray,
      targetpersion:this.CurrItem.keycode
    }
    this.dataServices.tpartnerjlpj(postData).subscribe(result => {
      this.submitting = false; 
      if(result){
        this.msg.success("分配成功!")
        this.closeModal();
      }
    })
  }

  loadUserWorkCount(userarray,isvalidarray){
    var self = this;
    //派件
    var postData = {
      enterpriseid:this.EnterPriseCode,
      userarray:userarray,
      isvalidarray:isvalidarray,
    }
    this.dataServices.staticworkcount(postData).subscribe(result => {
      if(result){
        _.each(result.data,it=>{
          _.each(self.DataList,iit=>{
            if(it.keycode == iit.keycode){
              iit.count = it.count;
            }
          })
        })
      }
    })
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }
}


