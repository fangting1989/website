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
import { TmemberApprovedEditComponent} from '../tmember-approved-edit/tmember-approved-edit.component'
import {Router} from '@angular/router';
@Component({
  selector: 'app-tmember-approved',
  templateUrl: './tmember-approved.component.html',
  styleUrls: ['./tmember-approved.component.scss']
})
export class TmemberApprovedComponent implements OnInit {
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
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData:any = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
    }
    if(this.searchObject.memtype){
      postData.memtype = this.searchObject.memtype
    }
    this.dataServices.find_member_sh(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        console.log(self.DataList)
      }
    })
  }

  SearchClick(e){
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
 
  editItem(item){
    var data = {HeadText:'认证审核',itemdata:item}
    const modal = this.modalHelper.create(TmemberApprovedEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}
