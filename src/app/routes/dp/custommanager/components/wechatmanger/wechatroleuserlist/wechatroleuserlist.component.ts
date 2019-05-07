import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../shared/services';
import { UUID } from 'angular2-uuid';
import {GlobalState} from './../../../../../../core/common';
import {_} from 'underscore'
import { Utils} from './../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { ModalHelper } from '@delon/theme';
import { MoneyCollectTwoTone } from '@ant-design/icons-angular/icons/public_api';
@Component({
  selector: 'app-wechatroleuserlist',
  templateUrl: './wechatroleuserlist.component.html',
  styleUrls: ['./wechatroleuserlist.component.scss']
})
export class WechatroleuserlistComponent implements OnInit {

  data: any;
  dataItem: any = {}
  searchObject:any = {}
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  DataList:any = []
  allChecked:any =false;
  loading:any = false;
  indeterminate:any = false
  

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private modal: NzModalRef,
    private _state:GlobalState,
  ) {
    this._state.notifyDataChanged('app.nav', { level: 1, NavName: "小程序角色配置", routerLink: "/custommanager/wechatrole" });
   }

  ngOnInit() {
    
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.dataItem = Object.assign({}, this.data.itemdata);
      }
    }

    this.loadData();
  }

  loadData(){
    var self = this; 
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      enterpriseid:this.comservices.getEnterPrise,
      searchtext:this.searchObject.searchText
    }
    this.dataServices.enterpriseuserlist(postData).subscribe(result => {
      if (result != null) {
        this.DataList = _.filter(result.data,it=>{return it.leveltype == 1})
        this.TotalCount = result.recordcount;
      }
    })
    
  }

  SearchClick(e){
    this.PageNum = 1;
    this.loadData();
  }
  refreshStatus(){

  }

  checkAll(e){
    _.each(this.DataList,it=>{
      it.active = this.allChecked;
    })
  }

  fpClick(){
    console.log(this.dataItem)
    var self  = this;
     _.each(this.DataList,it=>{
       if(it.active){
        //插入数据
        var postData = {
          wechatroleid:self.dataItem.keycode,
          userid:it.keycode,
          username:it.adminusernickname,
          createdate:moment()
        }
        self.dataServices.twechatuserIn(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("操作成功!")
            self.closeModal();
          }
        })
       }
     })
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

}
