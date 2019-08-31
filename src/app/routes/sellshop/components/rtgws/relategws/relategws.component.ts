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

@Component({
  selector: 'app-relategws',
  templateUrl: './relategws.component.html',
  styleUrls: [ './relategws.component.scss']
})
export class RelategwsComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = true;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  UserList:any = [];
  membercode:any;

  gwsList:any = []
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
   
    this.loadUserList();
  }

  loadUserList(){
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      pagesize:1000,
      pagenum:1,
    }
    this.dataServices.enterpriseuserlist(postData).subscribe(result => {
      if(result){
        this.UserList = result.data;
      }
    })
    
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode
    }
    this.dataServices.tproductbrandList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  loadgws(){
    var self = this;
    var postData = {
      pagesize:1000,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      memberid:this.membercode
    }
    this.dataServices.trtgwsList(postData).subscribe(result => {
      if (result != null) {
        self.gwsList = result.data;
      }
    })
  }

  userChanged(event){
    this.membercode = event;
    this.loadData();
    this.loadgws();
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  editItem(item){
    var postData = {
      memberid:this.membercode,
      enterpriseid:this.comservices.getEnterPrise,
      productbrandid:item.keycode
    }
    this.dataServices.trtgwsIn(postData).subscribe(result => {
      if(result){
        this.msg.success("操作成功!");
        this.loadgws();
      }
    })

  }

  DeleteItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode,
          enterpriseid:this.comservices.getEnterPrise
        }
        self.dataServices.trtgwsDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadgws()
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
}

