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
import { TOrderdetailCommentEditComponent} from '../torderdetail-edit/torderdetail-edit.component'

@Component({
  selector: 'app-torderdetail-comment-list',
  templateUrl: './torderdetail-list.component.html',
  styleUrls: ['./torderdetail-list.component.scss']
})
export class TOrderdetailCommentListComponent implements OnInit {
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
    this.dataServices.findcommentlist(postData).subscribe(result => {
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
    //_.each(this.StateArray,it=>{
    //  it.active = false;
    //})
    //item.active = true;
    //this.searchObject.isvalid = item.value
    this.loadData();
  }

  addClick(record: any = {}){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(TOrderdetailCommentEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(TOrderdetailCommentEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}
