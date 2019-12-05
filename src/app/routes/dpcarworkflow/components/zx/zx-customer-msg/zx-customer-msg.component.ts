import { Component, OnInit,ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Utils } from '../../../../../shared/utils';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {WorkflowBaseComponent} from './../../../../../shared/components';
import * as moment from 'moment';
import {_} from 'underscore';
import { forkJoin, of, interval } from 'rxjs';
@Component({
  selector: 'dpworksiteservices-zx-customer-msg',
  templateUrl: './zx-customer-msg.component.html',
  styleUrls: ['./zx-customer-msg.component.scss']
})
export class ZxCustomerMsgComponent  extends WorkflowBaseComponent implements OnInit{

  TabList:any = []
  FinancialList:any = [];
  /**
   * 主借款人信息
   */
  model:any = {}
  financialmodel:any = {}
  EnterPriseCode: any;
  componentTitle:any = "";

  imageList:any = []

  CurrItem:any = {};

  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    public elementRef:ElementRef,
  ) { 
    super(elementRef);
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadFinancialData();
  }

  loadFinancialData(){
    var self = this;
    var postData = {
      enterpriseid:this.EnterPriseCode,
      procinstid:this.task.processinstanceid
    }
    this.dataServices.tfinancialList(postData).subscribe(result=>{
      if(result){
        this.FinancialList = result.data;
        _.each(this.FinancialList,it=>{
          if(!self.CurrItem.keycode){
            self.CurrItem = it;
          }
          it.customer = {}
          try{
            var hrdata =  JSON.parse(it.hrbackdata)
            if(hrdata.msg == "success"){
              it.hrdata ="成功";
            }else{
              it.hrdata ="失败";
            }
          }catch(e){
            it.hrdata = "失败"
          }
          
          self.loadCustomerData(it);
        })
      }
    });
  }

  loadCustomerData(item){
    var postData = {
      enterpriseid:this.EnterPriseCode,
      procinstid:this.task.processinstanceid,
      customerid:item.customerid
    }
    this.dataServices.tcustomerList(postData).subscribe(result=>{
      if(result && result.data.length > 0){
        item.customer = result.data[0]
        item.zxtitle = "姓名:"+item.customer.customername + "　　身份证号:"+item.customer.idcard + "　　征信查询时间:"+moment(item.createdate).format("YYYY-MM-DD HH:mm:ss");
        if(item.customer.customertype == 10){
          item.customer.customertype_enum = "主借人"
        }else if(item.customer.customertype == 20){
          item.customer.customertype_enum = "反担保人"
        }else if(item.customer.customertype == 30){
          item.customer.customertype_enum = "共同还款人"
        }
        item.customer.imageList = []
        this.loadImages(item.customer)
      }
    })
  }

  loadImages(item){
    var postData = {
      enterpriseid:this.EnterPriseCode,
      customerid:item.keycode,
      procinstid:this.task.processinstanceid
    }
    this.dataServices.tfindcustomerimgList(postData).subscribe(result=>{
      if(result){
        item.imageList = result.data
        _.each(item.imageList ,it=>{
          it.filepath = WebConfig.BaseUrl + WebConfig.RequestUrl.fileuploadpath+ it.filepath
        })
      }
    })
  }

  ImageItemClick(item){
    var imageItem = Object.assign({},item)
    if(imageItem.content &&imageItem.filepath == null){
      imageItem.filepath = imageItem.content
    }
    ComFun.ImageViewer(imageItem,true)
  }

  SelectTab(event,item){
    this.CurrItem = item
  }

  saveClick(){
    //保存数据--循坏保存数据
    var self = this;
    var ArrayItem = []
    _.each(this.FinancialList,it=>{
      it.enterpriseid = self.comservices.getEnterPrise
      ArrayItem.push(self.dataServices.tfinancialUp(it))
    })
    forkJoin(ArrayItem).subscribe(t => {
      var SAVE_SUCCESS = true;
      _.each(t,iit=>{
        if(!iit){
          SAVE_SUCCESS = false;
        }
      })
      if(SAVE_SUCCESS){
        this.msg.success("更新成功!");
      }
    })
  }

  saveFinancial(item){
    if(item.keycode){
      
    }
    

  }

  CheckComponentState(){ 
    return {code:99,msg:'检测通过..'}
 }

}
