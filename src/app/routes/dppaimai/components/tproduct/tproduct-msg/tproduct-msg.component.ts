import { Component, OnInit } from '@angular/core';
import { NzMessageService,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../shared/utils/enums';
import { comservices } from '../../../../../shared/services';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {_} from 'underscore';
@Component({
  selector: 'app-tproduct-msg',
  templateUrl: './tproduct-msg.component.html',
  styleUrls: ['./tproduct-msg.component.scss']
})
export class TproductMsgComponent implements OnInit {

  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  stateArray: any = Enums.pm_productArray;
  paytypeArray: any = Object.assign([], Enums.paytypeArray);

  //竞拍
  JPDataList:any = []
  JPPageNum:any = 1;
  JPPageSize:any = 10;
  JPTotalCount:any = 0;

  //报名
  BMDataList:any = []
  BMPageNum:any = 1;
  BMPageSize:any = 10;
  BMTotalCount:any = 0;

  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private comservices: comservices,
    private route:ActivatedRoute,
    private router:Router,
    private modalService:NzModalService) { 
      this.EnterPriseCode = comservices.getEnterPrise
    }

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    var self = this;
    this.model = {}
    this.model.keycode = this.route.snapshot.queryParams["keycode"];
    this.model.enterpriseid = this.comservices.getEnterPrise;
    this.dataServices.tproductList(this.model).subscribe(result => {
      if (result != null && result.data.length > 0) {
         self.model = result.data[0];
        self.model.pmstartdate_enum = moment(self.model.pmstartdate).format("MM月DD日 HH:mm")
        self.model.pmenddate_enum = moment(self.model.pmenddate).format("MM月DD日 HH:mm")
        self.model.signenddate_enum = moment(self.model.signenddate).format("MM月DD日 HH:mm")
        _.each(this.stateArray,it=>{
          if(it.value == self.model.productvalid){
            self.model.productvalid_enum = it.name
          }
        })
        self.loadJPData();
        self.loadBMData();
       }
     })
  }

  loadJPData(){
    var self = this;
    var postData = {
      pagesize:this.JPPageSize,
      pagenum:this.JPPageNum,
      enterpriseid:this.comservices.getEnterPrise,
      productid:this.model.keycode,
    }
    this.dataServices.torderdetailList(postData).subscribe(result => {
      if(!result){
        return
      }
      this.JPDataList = result.data;
      _.each(this.JPDataList,it=>{
        if(it.price == this.model.execprice){
          it.zb = true
        }
      })
      self.JPTotalCount = result.recordcount;
    })
  }


  //加载报名信息
  loadBMData(){
    var self = this;
    var postData = {
      pagesize:this.BMPageSize,
      pagenum:this.BMPageNum,
      enterpriseid:this.comservices.getEnterPrise,
      productid:this.model.keycode,
      signproducttypestate: "10,20",
    }
    this.dataServices.tsignproductList(postData).subscribe(result => {
      if(!result){
        return
      }
      this.BMDataList = result.data;
      self.BMTotalCount = result.recordcount;
    })
  }

  goProductListPage(){
    this.router.navigate(['/dppaimai/tproductlist']);
  }

  signCencel(item){

    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定取消报名资格</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode,
          enterpriseid:this.comservices.getEnterPrise,
          isvalid:99
        }
        self.dataServices.tsignproductUp(postData).subscribe(result => {
          if(result){
            this.msg.success("操作成功!");
            this.loadBMData();
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });

    
  }
}
