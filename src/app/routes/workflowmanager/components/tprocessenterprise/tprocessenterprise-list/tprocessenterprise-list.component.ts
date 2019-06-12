import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
import { TProcessenterpriseEditComponent} from '../tprocessenterprise-edit/tprocessenterprise-edit.component'

@Component({
  selector: 'app-tprocessenterprise-list',
  templateUrl: './tprocessenterprise-list.component.html',
  styleUrls: ['./tprocessenterprise-list.component.scss']
})
export class TProcessenterpriseListComponent implements OnInit {
  enterpriseid:any;
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
    private _state:GlobalState,
    private router:Router,
    private route: ActivatedRoute,
  ) {
   
  }

  ngOnInit() {
    //接收参数
    this.enterpriseid = this.route.snapshot.queryParams["enterpriseid"];
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
    }
    this.dataServices.process_find(postData).subscribe(result => {
      if(result){
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        this.loadProwerProcess();
      }
    })
  }

  loadProwerProcess(){
    var self = this;
    var postData = {
      pagesize:2000,
      pagenum:1,
      enterpriseid: this.enterpriseid,
    }
    this.dataServices.tprocessenterpriseList(postData).subscribe(result => {
      if (result != null) {
        _.each(result.data,it=>{
          _.each(self.DataList,item=>{
            if(it.processid == item.id){
              item.active = true;
            }
          })
        })
      }
    })
  }

  CheckChanged(data){
    var postData = {
      enterpriseid:this.enterpriseid,
      processid:data.id,
      flag:data.active
    }
    this.dataServices.tprocessenterprise_prowerprocess(postData).subscribe(result => {
      if (result != null) {
        this.msg.success("操作成功!");
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
    const modal = this.modalHelper.create(TProcessenterpriseEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    var data = {HeadText:'编辑',itemdata:item}
    const modal = this.modalHelper.create(TProcessenterpriseEditComponent,{ data: data},{size:800}).subscribe(res => {
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
        self.dataServices.tprocessenterpriseDel(postData).subscribe(result => {
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
