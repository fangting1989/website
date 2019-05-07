import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { prodServices } from '../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TProductEditComponent} from '../tproduct-edit/tproduct-edit.component'
import { TproductImagesComponent} from '../tproduct-images/tproduct-images.component'
import { TproductContentComponent} from '../tproduct-content/tproduct-content.component'

@Component({
  selector: 'app-tproduct-list',
  templateUrl: './tproduct-list.component.html',
  styleUrls: ['./tproduct-list.component.scss']
})
export class TProductListComponent implements OnInit {
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
    private dataServices:prodServices,
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
    this.dataServices.tproductList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount =result.recordcount
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(TProductEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(TProductEditComponent,{ data: data},{size:800}).subscribe(res => {
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
        self.dataServices.tproductDel(postData).subscribe(result => {
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

  picItem(item){
    var data = {HeadText:'编辑图片',itemdata:item}
    const modal = this.modalHelper.create(TproductImagesComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
  contentItem(item){
    var data = {HeadText:'编辑内容',itemdata:item}
    const modal = this.modalHelper.create(TproductContentComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}
