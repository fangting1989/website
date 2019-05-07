import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { ModalHelper } from '@delon/theme';
import {EditBankcardComponent} from './edit-bankcard/edit-bankcard.component';
@Component({
  selector: 'app-component-partner-money',
  templateUrl: './partner-money.component.html',
  styleUrls: ['./partner-money.component.scss']
})
export class PartnerMoneyComponent implements OnInit {
  @Input() dataItem:any
  @Input() ComponentMode:any = 'read'
  EnterPriseCode:any;
  modelbh:any = {}
  ProinstList:any;
  LXRArray:any = []
  DataList:any = []
  BankCardObject:any = {}
  TotalDS:any = 0.0; //总共已缴纳
  TotalYXJ:any = 0.0; //意向金
  TotalJCBZJ:any = 0.0; //基础保证金
  TotalZLBZJ:any = 0.0; //增量保障金
  TotalMoney:any = 0.0; //总金额
  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.TotalMoney = Utils.accAdd(Utils.accAdd(this.dataItem.yxj , this.dataItem.jbbzj),this.dataItem.zlbzj);
    this.LoadBankCard();
    this.loadNeedMoneyList();
    this.loadMoney();
    if(this.dataItem.caneditbankcard){
      //edit 为编辑模式
      this.ComponentMode = 'edit'
      console.log(this.ComponentMode)
    }
  }

  //加载银行卡
  LoadBankCard(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      objectcode:this.dataItem.keycode,
      objectmark:'partner'
    }
    this.dataServices.tbankcardList(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length >0){
          this.BankCardObject = result.data[0]
          console.log(this.BankCardObject)
        }
       
      }
    })
  }
  loadNeedMoneyList(){
    var self = this;
    var postData = {
      pagesize:200,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode,
    }
    this.dataServices.tneedmoneyList(postData).subscribe(result => {
      if (result != null) {
        this.DataList = result.data
        _.each( this.DataList,it=>{
          it.totalmoney = Utils.accAdd(Utils.accAdd(it.yxj,it.jcbzj),it.zlbzj)
        })
      }
    })
  }
  loadMoney(){
    var self = this;
    var postData = {
      partnerid:this.dataItem.keycode
    }
    this.dataServices.needmoney(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length == 1 && result.data[0]== null){
          this.TotalDS = 0.0
        }
        else{
          this.TotalYXJ = result.data[0].yxj
          this.TotalJCBZJ = result.data[0].jcbzj
          this.TotalZLBZJ = result.data[0].zlbzj
          this.TotalDS = Utils.accSub(Utils.accSub(Utils.accSub(this.TotalMoney, this.TotalYXJ),this.TotalJCBZJ),this.TotalZLBZJ)
        }
      }
    })
    
  }

  editBankItem(item){
    var self = this;
    var data = {HeadText:'银行卡信息',itemdata:item}
    const modal = this.modalHelper.create(EditBankcardComponent,{ data: data},{size:800}).subscribe(res => {
      if(res){
        this.BankCardObject.name = res.name
        this.BankCardObject.bankname = res.bankname
        this.BankCardObject.account = res.account
      }
    });
  }
}
