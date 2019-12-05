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
import {TmemberYqComponent} from '../tmember-yq/tmember-yq.component';
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
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  membertypeArray:any = [{name:"全部",value:null},{name:'普通会员',value:"10,25"},{name:'邀请会员',value:"27,28"},{name:'认证会员',value:"30"},{name:'公司员工',value:"35"}]
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
      postData.memtypes = this.searchObject.memtype
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

  addClick(record: any = {}){
    var data = {HeadText:'编辑'}
    const modal = this.modalHelper.create(TMemberEditComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  editItem(item){
    this.router.navigate(['/sellshop/tmemberedit'],{ queryParams: { keycode: item.keycode } });
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

  yqmember(item){
    var data = {HeadText:'邀请列表',itemdata:item}
    const modal = this.modalHelper.create(TmemberYqComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}
