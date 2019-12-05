import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {Enums} from './../../../../../shared/utils/enums';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TMemberEditComponent} from '../tmember-edit/tmember-edit.component'
import {Router} from '@angular/router';
@Component({
  selector: 'app-tmember-yq',
  templateUrl: './tmember-yq.component.html',
  styleUrls: ['./tmember-yq.component.scss']
})
export class TmemberYqComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  membertypeArray:any = Object.assign([],Enums.membertypeArray) 

  model:any = {}
  data: any;
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "认证审核"
      }
      if (this.data.itemdata) {
        this.model = Object.assign({}, this.data.itemdata);
        this.loadData();
      }
    }
  }

  loadData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      pid:this.model.keycode
    }
    if(this.searchObject.memtype){
      postData.memtype = this.searchObject.memtype
    }
    this.dataServices.tmemberList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.PageNum = 1;
    this.loadData();
  }

  changeState(e,item){
    _.each(this.membertypeArray,it=>{
      it.active = false;
    })
    item.active = true;
    this.searchObject.memtype = item.value
    this.loadData();
  }
}
