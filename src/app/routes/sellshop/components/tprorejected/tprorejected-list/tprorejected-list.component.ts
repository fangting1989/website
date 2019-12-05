import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TProrejectedEditComponent} from '../tprorejected-edit/tprorejected-edit.component'

@Component({
  selector: 'app-tprorejected-list',
  templateUrl: './tprorejected-list.component.html',
  styleUrls: ['./tprorejected-list.component.scss']
})
export class TProrejectedListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"全部",active:true},{name:"待处理",value:1},{name:'已拒绝',value:5},{name:'待收货确认',value:6},{name:'已处理',value:10}]
  checkArray:any = [{name:'退货',value:1,active:true},{name:'换货',value:2}]
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
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode
    }
    if(this.searchObject.isvalid){
      postData.isvalid = this.searchObject.isvalid
    }
    this.dataServices.tprorejectedList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        _.each(self.DataList,it=>{
          try{
            it.prorejectedcontent = JSON.parse(it.prorejectedcontent)
            if(it.prorejectedcontent &&it.prorejectedcontent.object ){
              it.unitname = it.prorejectedcontent.object.unitname
            }
          }catch(e){

          }
          
          self.loadProduct(it)
          self.loadReject(it)
          _.each(self.checkArray,iiit=>{
            if(it.rejectedtype + "" == iiit.value + ""){
              it.rejectedtype_enum = iiit.name;
            }
          })
          _.each(self.StateArray,iiit=>{
            if(it.isvalid + "" == iiit.value + ""){
              it.isvalid_enum = iiit.name;
            }
          })
          
        })
      }
    })
  }

  loadProduct(item){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      productcode:item.productid,
    }
    this.dataServices.tproductList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        item.productname = result.data[0].productname
      }
    })
  }

  loadReject(item){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      refusecode:item.reasontypeid,
    }
    this.dataServices.trefuseList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        item.refusename = result.data[0].reason
      }
    })
  }

  SearchClick(e){
    this.PageNum = 1;
    this.loadData();
  }

  changeState(e,item){
    _.each(this.StateArray,it=>{
     it.active = false;
    })
    item.active = true;
    this.searchObject.isvalid = item.value
    this.loadData();
  }

  editItem(item){
    var data = {HeadText:'退款详情',itemdata:item}
    const modal = this.modalHelper.create(TProrejectedEditComponent,{ data: data},{size:1000}).subscribe(res => {
      this.loadData()
    });
  }
}
