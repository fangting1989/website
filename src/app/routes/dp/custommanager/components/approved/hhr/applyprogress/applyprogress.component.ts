
import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../../core/common';
import { dataServices } from '../../../../services';
import { _ } from 'underscore';
import { ActivatedRoute } from '@angular/router';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../../shared/services';
import {HhrComtinueeditComponent } from '../hhr-comtinueedit/hhr-comtinueedit.component'
import { HhrEditComponent} from './../../hhrapply/hhr-edit/hhr-edit.component';
import {ZcEditComponent} from './../zc-edit/zc-edit.component';
import {HhrAchivedComponent} from './../../common/hhr-achived/hhr-achived.component';
@Component({
  selector: 'app-applyprogress',
  templateUrl: './applyprogress.component.html',
  styleUrls: ['./applyprogress.component.scss']
})
export class ApplyprogressComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  CustomType:any = [{name:'潜力客户',value:1},{name:'意向客户',value:2}]
  ShowMore:any = false

  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private activatedRoute: ActivatedRoute
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    var self = this;
    this.activatedRoute.queryParams.subscribe(queryParams => {
        if(queryParams.r){ 
          self.loadData();
        }
    });
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
      pid:this.comservices.getUserCode,
      maxvalidstate:1080
    }
    this.dataServices.tpartnerList(postData).subscribe(result => {
      if (result != null) {
        console.log(result)
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
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
        self.dataServices.tpartnerDel(postData).subscribe(result => {
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

  ComtinueHhrEdit(item){
    var data = {HeadText:'客户信息',itemdata:item}
    const modal = this.modalHelper.create(HhrEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  Edit(item){
    var data = {HeadText:'修改政策',itemdata:item}
    const modal = this.modalHelper.create(ZcEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  ReadData(item){
    var data = {HeadText:'合伙人档案',itemdata:item}
    const modal = this.modalHelper.create(HhrAchivedComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}
