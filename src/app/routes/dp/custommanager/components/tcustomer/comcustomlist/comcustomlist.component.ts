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
import { TCustomerEditComponent} from '../tcustomer-edit/tcustomer-edit.component'
import { CustomerReadComponent} from '../customer-read/customer-read.component'
import { Enums } from './../../../../../../shared/utils/enums';
@Component({
  selector: 'app-comcustomlist',
  templateUrl: './comcustomlist.component.html',
  styleUrls: ['./comcustomlist.component.scss']
})
export class ComcustomlistComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  UserCode:any;
  seladdress:any;
  chinaCity:any
  opt:any;
  CurrItem:any = {}
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  CustomerType: any = Object.assign([], Enums.customertype);

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
    this.UserCode = comservices.getUserCode
  }

  ngOnInit() {
    this.loadData();
    this.chinaCity = chinaCity;
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      region:this.searchObject.region == ""?null:this.searchObject.region,
      isvalid:1, 
      customertypearray:this.searchObject.customertypearray ==undefined ?null:this.searchObject.customertypearray
    }
    this.dataServices.tcustomerList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    item.active = !item.active
    this.searchObject.customertypearray = []
    _.each(this.CustomerType,it=>{
      if(it.active){
        this.searchObject.customertypearray.push(it.value)
      }
    })
    this.loadData();
  }
  onCustomSelected(e){
    var Address = '';
    var codeAddress = ''
    _.each(e.paths,item=>{
      Address += (Address == ''?'':',') + item.name
      codeAddress +=  (codeAddress == ''?'':',') + item.id
    })
    if(Address != ''){
      this.searchObject.region = Address
    }
  }

  dealItem(item){
  var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否将该客户进行锁定？</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode,
          enterpriseid:self.EnterPriseCode,
          isvalid:2,
          lockUserID:self.comservices.getUserCode
        }
        self.dataServices.tcustomerUp(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("操作成功!");
            self.loadData()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }


  oncityChanges(e){
    var region = "";
    _.each(e,it=>{
      region += (region == ""?"":",")+it
    })
    this.searchObject.region = region
    this.loadData();
  }

  citySelect(e){
    _.each(e.option.children,it=>{
      if(!it.children){
        it.isLeaf = true
      }
    })
  }
  // unlockItem(item){
  

  // }
}
