import { Component, OnInit,AfterViewInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import { ModalHelper } from '@delon/theme';
import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import {TurnbackComponent} from  '../../common/turnback/turnback.component'
import {MaterialUploadImagesComponent} from './../../common/material-upload-images/material-upload-images.component'

//征信结果录入
@Component({
  selector: 'app-zx-edit',
  templateUrl: './zx-edit.component.html',
  styleUrls: ['./zx-edit.component.scss']
})
export class ZxEditComponent implements OnInit,AfterViewInit {
  data: any;
  dataItem: any = {}
  model: any = {}
  seladdress:any;
  EnterPriseCode: any;
  submitting:any = false;
  ConfigData:any = {}
  DBRArray:any = []
  ProinstList:any = []
  array:any = [1,2,3,4]
  // values:any;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  opt:any;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper
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
        this.dataItem = Object.assign({}, this.data.itemdata);
      }
    }
  }

  IndexChange(e){
    if(e.index == 1){
        this.refreshSwiper();
    }
  }
  refreshSwiper(){
    setTimeout(function(){
      var mSwiper = new Swiper('.swiper-container',{
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          delay: 1000,//1秒切换一次
        },
      }) 
    },1000)
  }
  ngAfterViewInit(){
    //
  }


  

  

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

  ProinstBack(){
    var self = this;
    var data = {HeadText:'驳回信息',itemdata:this.dataItem}
    const modal = this.modalHelper.create(TurnbackComponent,{ data: data},{size:500}).subscribe(res => {
        if(res){
          self.closeModal();
        }
    });
    
  }

  ProinstSubmit(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定提交到下一环节?</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          partnerkeycode:self.dataItem.keycode, 
          enterpriseid:self.EnterPriseCode,
          dealPerson:self.comservices.getUserName,
          dealCode:self.comservices.getUserCode,
        }
        self.dataServices.tpartnerzxtj(postData).subscribe(result => {
          if (result != null) {
           self.msg.success("提交成功!");
           self.closeModal();
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
}
