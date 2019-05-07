import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { Enums } from './../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { ModalHelper } from '@delon/theme';

import { WechatroleuserlistComponent} from './../wechatroleuserlist/wechatroleuserlist.component'

@Component({
  selector: 'app-wechatrole',
  templateUrl: './wechatrole.component.html',
  styleUrls: ['./wechatrole.component.scss']
})
export class WechatroleComponent implements OnInit {
  hasmenu :any =false
  roleList:any = []
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  changeHeight: number;
  CurrItem:any = null
  RightArray:any =[{name:'是',value:1},{name:'否',value:0}]
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
  ) { 
    this.changeHeight = window.innerHeight - 110;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    var self = this; 
    var postData = {
      pagesize:200,
      pagenum:1,
    }
    this.dataServices.twechatroleList(postData).subscribe(result => {
      if (result != null) {
        this.roleList = result.data
        if(this.roleList.length > 0){
          this.roleList[0].active = true
          this.CurrItem =  this.roleList[0]
          this.loadUserList(this.CurrItem)
        }
      }
    })
  }

  loadUserList(item){
    if(item.name == '评审初审'){
      this.hasmenu = true;
    }else{
      this.hasmenu = false;
    }
    _.each(this.roleList,ditem=>{
      ditem.active = false;
    })
    item.active = true;
    this.CurrItem = item
    var self = this; 
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      wechatroleid:item.keycode
    }
    this.dataServices.twechatuserList(postData).subscribe(result => {
      if (result != null) {
        this.DataList = result.data
        _.each(this.DataList,it=>{
          it.hasright = it.hasright  + ""
        })
      }
    })
  }

  RightChange(e,item){
    var self  = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确定修改状态</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode,
          hasright:e,
        }
        self.dataServices.twechatuserUp(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("操作成功!");
            self.loadUserList(self.CurrItem)
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {

      }
    });
  }
  addClick(){
    //
    if(!this.CurrItem){
      this.msg.error("请先选择角色")
      return;
    }
    var item = this.CurrItem;
    var data = {HeadText:'分配',itemdata:item}
    const modal = this.modalHelper.create(WechatroleuserlistComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadUserList(this.CurrItem)
    });
  }

  deleteItem(item){
    var self  = this;
    if(item.keycode){
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
          self.dataServices.twechatuserDel(postData).subscribe(result => {
            if (result != null) {
              self.msg.success("删除成功!");
              self.loadUserList(self.CurrItem)
            }
          })
        },
        nzCancelText: '取消',
        nzOnCancel  : () => {

        }
      });
    }
  }
}
