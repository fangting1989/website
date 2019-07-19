import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-fxcustomlist',
  templateUrl: './fxcustomlist.component.html',
  styleUrls: ['./fxcustomlist.component.scss']
})
export class FxcustomlistComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;  
  UserCode:any;
  CurrItem:any = {}
  chinaCity:any
  regionPlaceHolder:any = "请选择..."
  CustomerType: any = Object.assign([], Enums.customertype);

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private activatedRoute: ActivatedRoute
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    var self = this; 
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if(queryParams.r){ 
        self.loadData();
      }
    });
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
      isvalid:3,
      pcode:this.comservices.getUserCode,
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

  addClick(record: any = {}){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(TCustomerEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(TCustomerEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  moveItem(item){
    this.CurrItem = item;
  }

  moveChange(e,item){
    var self = this;
    this.CurrItem.visible = false
    if(e == false){
      return;
    }
    //更新内容
    if(item.value == this.CurrItem.customertype){
      return;
    }
    var postData = {
      enterpriseid:this.EnterPriseCode,
      keycode:this.CurrItem.keycode,
      customertype:item.value 
    }
    this.dataServices.tcustomerUp(postData).subscribe(result => {
      if(result && result.data.keycode){
        self.msg.success("操作成功!")
        self.CurrItem.customertype = item.value
      }
    })
  }


  readItem(item){
    var data = {HeadText:'客户信息',itemdata:item}
    const modal = this.modalHelper.create(CustomerReadComponent,{ data: data},{size:500}).subscribe(res => {
      this.loadData()
    });
  }

  unlockItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认解锁客户</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode,
          enterpriseid:self.EnterPriseCode,
          isvalid:1,
          lockUserID:''
        }
        self.dataServices.tcustomerUp(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("解锁成功!");
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
}
