import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {Utils} from '../../../../../shared/utils'
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TBankEditComponent} from '../tbank-edit/tbank-edit.component'

@Component({
  selector: 'dpworksiteservices-tbank-list',
  templateUrl: './tbank-list.component.html',
  styleUrls: ['./tbank-list.component.scss']
})
export class TBankListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
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
      enterpriseid: this.EnterPriseCode
    }
    this.dataServices.tbankList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        //解析枚举
        _.each(self.DataList,it=>{
          it.worktype_enum = Utils.enumname(result.enums,"dp_xxh_worktype",it.worktype)
          it.districtcode_enum = Utils.enumcity(it.districtcode,2)
        })
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    //_.each(this.StateArray,it=>{
    //  it.active = false;
    //})
    //item.active = true;
    //this.searchObject.isvalid = item.value
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(TBankEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(TBankEditComponent,{ data: data},{size:800}).subscribe(res => {
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
        self.dataServices.tbankDel(postData).subscribe(result => {
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
