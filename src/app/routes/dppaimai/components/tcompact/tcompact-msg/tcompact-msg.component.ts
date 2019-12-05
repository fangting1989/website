import { Component, OnInit } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { ModalHelper } from '@delon/theme';
import {GlobalState} from '../../../../../core/common/global.state';
import {Utils} from './../../../../../shared/utils/utils';
import {_} from 'underscore'
@Component({
  selector: 'app-tcompact-msg',
  templateUrl: './tcompact-msg.component.html',
  styleUrls: ['./tcompact-msg.component.scss']
})
export class TcompactMsgComponent implements OnInit {
  data: any;
  isVisible:any = false;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Object.assign([], Enums.stateArray);
  paytypeArray: any = Object.assign([], Enums.paytypeArray);

  //团拍
  TPDataList:any = []
  TPPageNum:any = 1;
  TPPageSize:any = 10;
  TPTotalCount:any = 0;

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private router:Router,
    private modalHelper:ModalHelper,
    private GlobalState:GlobalState,
    private modalService:NzModalService,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise

    this.GlobalState.subscribe("reflashuserdata","64d33e98-69e1-4a9c-b280-c93c7fc0ceb9",function(data){
      if(data.eventname == 'reload'){
        this.loadData();
      }
    })
  }

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.dataServices.tcompactList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
         //图
         self.model.signfilepath = WebConfig.BaseUrl + WebConfig.RequestUrl.dppaimaiservices + self.model.signfilepath 
         self.model.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.dppaimaiservices + self.model.filepath
         //金额
         //self.model.zdfk = Utils.accMul(self.model.signamount,self.model.amount)
         self.model.xianjin = Utils.accSub(self.model.price,self.model.signamount)
         //
         if(self.model.compacttype == 20){
          this.loadTPData()
         }

       }
     })
  }


  goCompactPage(){
    this.router.navigate(['/dppaimai/tcompactlist']);
  }

  Approved(){
    //审核确定
    this.isVisible = true;
    //surecompact
  }

  handleCancel(){
    this.isVisible = false;
  }

  handleUnPass(){
    //流拍
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">审核不通过，会将商品竞拍会流拍，中标的人会被扣除对应的保证金</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          enterpriseid:self.comservices.getEnterPrise,
          keycode:self.model.keycode,
          isvalid:20,
          approvedperson:self.comservices.getUserName,
          remark:self.model.advice
        }
        self.dataServices.surecompact(postData).subscribe(ret=>{
          if(ret){
            self.msg.success("操作成功!");
            self.model.isvalid = 20
            self.isVisible = false;
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  handlePass(){
    //审核确定
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">审核通过,对应用户的账户会扣除相应的金额,如账户余额不足，请先补齐!</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          enterpriseid:self.comservices.getEnterPrise,
          keycode:self.model.keycode,
          isvalid:30,
          approvedperson:self.comservices.getUserName,
          remark:self.model.advice
        }
        self.dataServices.surecompact(postData).subscribe(ret=>{
          if(ret){
            self.msg.success("操作成功!");
            self.model.isvalid = 30
            self.isVisible = false;
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  //加载报名信息
  loadTPData(){
    var self = this;
    if(self.model.compacttype == 10){
      return;
    }
    var postData = {
      pagesize:500,
      pagenum:this.TPPageNum,
      enterpriseid:this.comservices.getEnterPrise,
      compactid:self.model.keycode
    }
    this.dataServices.tcompactmoneyList(postData).subscribe(result => {
      if(!result){
        return
      }
      this.TPDataList = result.data;
      _.each( this.TPDataList,it=>{
          it.xianjin = Utils.accSub(it.compactamount,it.signamount)  
      })
      self.TPTotalCount = result.recordcount;
    })
  }
}

