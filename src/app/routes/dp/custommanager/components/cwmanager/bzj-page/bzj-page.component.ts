import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../shared/services';

import {NeedmoneyPzComponent} from './needmoney-pz/needmoney-pz.component'
import {UploadPzComponent} from './upload-pz/upload-pz.component'
import { Utils} from './../../../../../../shared/utils/utils';
@Component({
  selector: 'app-bzj-page',
  templateUrl: './bzj-page.component.html',
  styleUrls: ['./bzj-page.component.scss']
})
export class BzjPageComponent implements OnInit {
  DataList:any = []
  MoneyList:any =[]
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  ShowMore:any = false
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      maxvalidstate:"1090"
    }
    this.dataServices.tpartnerList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        _.each(self.DataList,it=>{
          it.totalmoney = Utils.accAdd(Utils.accAdd(it.yxj,it.jbbzj),it.zlbzj)
          self.loadNeedMoney(it)
        })
      }
    })
  }

  loadNeedMoney(item){
    item.gettotalmoney = 0
    var self = this;
    var postData = {
      pagesize:2000,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:item.keycode
    }
    this.dataServices.tneedmoneyList(postData).subscribe(result => {
      if (result != null) {
        item.MoneyList = result.data;
        var gettotalmoney = 0.0
        var list = _.filter(item.MoneyList,it=>{return it.isvalid == 99})
        _.each(list,it=>{
          gettotalmoney += Utils.accAdd(Utils.accAdd(it.yxj,it.jcbzj),it.zlbzj)
        })
        item.gettotalmoney = gettotalmoney;
        
      }
    })

    
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  deleteItem(item){
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
        self.dataServices.tcustomerDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }

  UploadPZ(item){
    var data = {HeadText:'上传凭证',itemdata:item}
    const modal = this.modalHelper.create(UploadPzComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
    
  }

  readData(item){
    var data = {HeadText:'汇款明细',itemdata:item}
    const modal = this.modalHelper.create(NeedmoneyPzComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}

