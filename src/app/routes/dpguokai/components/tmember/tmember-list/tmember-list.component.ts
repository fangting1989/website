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
import { TMemberEditComponent} from '../tmember-edit/tmember-edit.component'
import {Router} from '@angular/router';
@Component({
  selector: 'app-tmember-list',
  templateUrl: './tmember-list.component.html',
  styleUrls: ['./tmember-list.component.scss']
})
export class TMemberListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"已驳回",value:-1},{name:'填写状态',value:0},{name:'审核中',value:1},{name:'审核通过',value:2}]
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router,
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
    }
    this.dataServices.tmemberList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        _.each(self.DataList,it=>{
          _.each(self.StateArray,iit=>{
            if(it.memtype == iit.value){
              it.memtype_enum = iit.name
            }
          })
         
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
    const modal = this.modalHelper.create(TMemberEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    // var data = {HeadText:'编辑',itemdata:item}
    // const modal = this.modalHelper.create(TMemberEditComponent,{ data: data},{size:800}).subscribe(res => {
    //   this.loadData()
    // });

    this.router.navigate(['/dpguokai/tmemberedit'],{ queryParams: { keycode: item.keycode } });
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
        self.dataServices.tmemberDel(postData).subscribe(result => {
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
