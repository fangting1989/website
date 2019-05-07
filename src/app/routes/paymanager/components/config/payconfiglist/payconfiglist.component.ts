import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { payServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { PayconfigeditComponent} from '../payconfigedit/payconfigedit.component'

@Component({
  selector: 'app-payconfiglist',
  templateUrl: './payconfiglist.component.html',
  styleUrls: ['./payconfiglist.component.scss']
})
export class PayConfiglistComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private payServices:payServices,
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
      enterpriseid: this.EnterPriseCode
    }
    this.payServices.payconfigList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
      }
    })
  }

  SearchClick(event){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'配置编辑'}
    const modal = this.modalHelper.create(PayconfigeditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'配置编辑',itemdata:item}
    const modal = this.modalHelper.create(PayconfigeditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
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
        self.payServices.payconfigDel(postData).subscribe(result => {
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
}
