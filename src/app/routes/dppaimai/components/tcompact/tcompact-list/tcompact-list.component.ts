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
import { TCompactEditComponent} from '../tcompact-edit/tcompact-edit.component'
import {Router} from '@angular/router';
import {Enums} from '../../../../../shared/utils/enums';
import {Utils} from './../../../../../shared/utils/utils';
@Component({
  selector: 'dppaimaiservices-tcompact-list',
  templateUrl: './tcompact-list.component.html',
  styleUrls: ['./tcompact-list.component.scss']
})
export class TCompactListComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  StateArray:any = [{name:"有效",value:1},{name:'无效',value:0}]
  pm_compactstateArray: any= [{name:'全部',value:null}].concat(Enums.pm_compactstateArray);
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
    if(this.searchObject.isvalid){
      postData.isvalid = this.searchObject.isvalid
    }
    this.dataServices.tcompactList(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        _.each(self.DataList,it=>{
          it.xianjin =  Utils.accSub(it.productprice,it.price)
        })
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    _.each(this.pm_compactstateArray,it=>{
     it.active = false;
    })
    item.active = true;
    this.searchObject.isvalid = item.value
    this.loadData();
  }


  editItem(item){
    // var data = {HeadText:'编辑',itemdata:item}
    // const modal = this.modalHelper.create(TCompactEditComponent,{ data: data},{size:800}).subscribe(res => {
    //   this.loadData()
    // });
    this.router.navigate(['/dppaimai/tcompactemsg'],{ queryParams: { keycode: item.keycode } });
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
        self.dataServices.tcompactDel(postData).subscribe(result => {
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
