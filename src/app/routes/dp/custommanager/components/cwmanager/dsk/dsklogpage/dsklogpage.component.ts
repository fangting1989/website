import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../../core/common';
import { dataServices } from '../../../../services';
import { _ } from 'underscore';
import { Utils} from './../../../../../../../shared/utils/utils';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../../shared/services';

import {DpComponentImageComponent} from '../../../common/dp-component-image/dp-component-image.component';

@Component({
  selector: 'app-dsklogpage',
  templateUrl: './dsklogpage.component.html',
  styleUrls: ['./dsklogpage.component.scss']
})
export class DsklogpageComponent implements OnInit {

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
      person:this.comservices.getUserName,
      searchtext:this.searchObject.searchText
    }
    this.dataServices.needmoney_dsk_finish(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        _.each(self.DataList,it=>{
          it.totalmoney = Utils.accAdd(Utils.accAdd(it.YXJ,it.JCBZJ),it.ZLBZJ);
        })
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
        self.dataServices.tactionDel(postData).subscribe(result => {
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

  stopItem(item){
    
  }

  readItem(item){

  }

  readFkpz(item){
    //付款凭证
    item.imgtype = "needmoney-pz"
    item.componentmode = 'read';
    var data = {HeadText:'付款凭证',itemdata:item}
    const modal = this.modalHelper.create(DpComponentImageComponent,{ data: data},{size:800}).subscribe(res => {
    });
  }

  readDkpz(item){
    //打款凭证
    item.imgtype = "needmoney-dsk-img"
    item.componentmode = 'read';
    var data = {HeadText:'付款凭证',itemdata:item}
    const modal = this.modalHelper.create(DpComponentImageComponent,{ data: data},{size:800}).subscribe(res => {
    });
  }


}