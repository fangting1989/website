import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {_} from 'underscore';
import {Utils} from './../../../../../shared/utils/utils';
@Component({
  selector: 'app-tprorejected-edit',
  templateUrl: './tprorejected-edit.component.html',
  styleUrls: ['./tprorejected-edit.component.scss']
})
export class TProrejectedEditComponent implements OnInit {
  data: any;
  model: any = {
    orderdetail:{}
  }
  EnterPriseCode: any;
  submitting:any = false;
  paytypeArray: any = Object.assign([], Enums.paytypeArray);
  StateArray:any = [{name:"全部",active:true},{name:"待处理",value:1},{name:'已拒绝',value:5},{name:'已处理',value:10}]

  datamodel:any = {}
  AddressModel:any = {}
  prorejectedcontent:any;
  isVisible:any = false;

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private route:ActivatedRoute,
    private modalService:NzModalService,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    var self = this;
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        _.each(this.StateArray,it=>{
          if(it.value == self.model.isvalid){
            self.model.isvalid_enum = it.name
            self.model.orderdetail = {}
          }
        })
        this.prorejectedcontent =this.model.prorejectedcontent
        this.loadmember();
        this.loadOrderDetail(this.model)
      }
    }
  }

  loadmember(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      memcode:this.model.memberid
    }
    this.dataServices.tmemberList(postData).subscribe(result => {
      if(result &&result.data.length > 0){
        this.model.memMobile = result.data[0].memMobile;
      }
    })
  }
  //加载商品祥
  loadOrderDetail(item){
   var postData = {
    enterpriseid:this.comservices.getEnterPrise,
    orderdetailcode:item.orderdetailid
   }
   this.dataServices.torderdetailList(postData).subscribe(result => {
     if(result){
      item.orderdetail = result.data[0]
      item.orderdetail.pointsoff = item.orderdetail.pointsoff?item.orderdetail.pointsoff:0
      if(item.isvalid == 1){
        item.rejectamount =  item.orderdetail.paymoney
        item.rejectpoints =  item.orderdetail.pointsoff
      }
      this.loadProductunit( item.orderdetail)
     }
   })
  }

  loadProductunit(item){
    var postData = {
      productid:item.productid,
      unitcode:item.unitid,
      enterpriseid:this.comservices.getEnterPrise,
    }
    this.dataServices.tproductunitList(postData).subscribe(result=>{
      if(result && result.data.length > 0){
       this.model.productbusinessno = result.data[0].productbusinessno
       this.model.productunitno = result.data[0].productunitno
      }
    })
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }


  saveSureClick(){
    if(Utils.IsStringNullOrEmpty(this.model.rejectamount)){
      if(this.model.rejectamount ===0){

      }else{
        this.msg.error("请填写退货金额")
        return;
      }
    }
    if(Utils.IsStringNullOrEmpty(this.model.rejectpostmoney)){
      if(this.model.rejectpostmoney ===0){

      }else{
        this.msg.error("请填写退货运费金额")
        return;
      }
    }
    if(Utils.IsStringNullOrEmpty(this.model.rejectaddress)){
      this.msg.error("请填写退货地址")
      return;
    }
    if(Utils.IsStringNullOrEmpty(this.model.rejectlinkman)){
      this.msg.error("请填写退货联系人")
      return;
    }
    if(Utils.IsStringNullOrEmpty(this.model.rejectphone)){
      this.msg.error("请填写退货联系电话")
      return;
    }
    //退款金额不能大于支付金额
    if(this.model.rejectamount > this.model.orderdetail.paymoney){
      this.msg.error("退款金额不能大于支付金额")
      return;
    }

    //退积分不能大于支付积分
    if(this.model.rejectpoints > this.model.orderdetail.pointsoff){
      this.msg.error("退积分数不能大于支付积分")
      return;
    }
    //退运费不能大于运费
    if(this.model.rejectpostmoney > 0){
      if(!this.model.orderdetail.zipamount){
        this.msg.error("支付时无运费")
        return;
      }else{
        if(this.model.rejectpostmoney > this.model.orderdetail.zipamount){
          this.msg.error("退运费不能大于支付运费")
          return;
        }
      }
    }

    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认处理当前退款信息</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
       self.saveClick();
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  saveClick(){
    var postData = {
      dealperson:this.comservices.getUserName,
      enterpriseid:this.comservices.getEnterPrise,
      rejectamount:this.model.rejectamount,
      rejectaddress:this.model.rejectaddress,
      rejectlinkman:this.model.rejectlinkman,
      rejectphone:this.model.rejectphone,
      rejectdesc:this.model.rejectdesc,
      rejectpostmoney:this.model.rejectpostmoney,
      rejectpoints:this.model.rejectpoints ?this.model.rejectpoints:0,
      isvalid:6,
      keycode:this.model.keycode
    }
    this.dataServices.tprorejectedUp(postData).subscribe(result => {
      if(result){
        this.isVisible = false;
        this.msg.success("处理成功!")
        this.closeModal();
      }
    })
  }

  SureBackClick(){

    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">确定处理完成，会将对应的钱原路打回</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          enterpriseid:self.comservices.getEnterPrise,
          isvalid:10,
          keycode:self.model.keycode
        }
        self.dataServices.tprorejectedUp(postData).subscribe(result => {
          if(result){
            self.isVisible = false;
            self.msg.success("处理成功!")
            self.closeModal();
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  cancelClick(){
    this.isVisible = true;
  }

  handleCancel(){
    this.isVisible = false;
  }

  handleOk(){
    if(Utils.IsStringNullOrEmpty(this.model.advice)){
      this.msg.error("请填写拒绝理由")
      return;
    }
    var postData = {
      dealperson:this.comservices.getUserName,
      dealadvice:this.model.advice, 
      enterpriseid:this.comservices.getEnterPrise,
      rejectamount:0,
      rejectpostmoney:0,
      rejectpoints:0,
      isvalid:5,
      keycode:this.model.keycode
    }
    this.dataServices.tprorejectedUp(postData).subscribe(result => {
      if(result){
        this.isVisible = false;
        this.msg.success("处理成功!")
        this.closeModal();
      }
    })
  }

}
