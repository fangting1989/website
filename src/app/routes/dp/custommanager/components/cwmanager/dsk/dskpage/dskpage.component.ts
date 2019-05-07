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
import {DskImagesComponent} from '../dsk-images/dsk-images.component';
import {DpComponentImageComponent} from '../../../common/dp-component-image/dp-component-image.component';
@Component({
  selector: 'app-dskpage',
  templateUrl: './dskpage.component.html',
  styleUrls: ['./dskpage.component.scss']
})
export class DskpageComponent implements OnInit {

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
    }
    this.dataServices.needmoney_dsk(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        _.each(self.DataList,it=>{
          it.totalmoney = Utils.accAdd(Utils.accAdd(it.YXJ,it.JCBZJ),it.ZLBZJ);
        })
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  readFkpz(item){
    //付款凭证
    item.imgtype = "needmoney-pz"
    item.componentmode = 'read';
    var data = {HeadText:'付款凭证',itemdata:item}
    const modal = this.modalHelper.create(DpComponentImageComponent,{ data: data},{size:800}).subscribe(res => {
    });

  }

  uploadpz(item){
    var data = {HeadText:'上传凭证',itemdata:item}
    const modal = this.modalHelper.create(DskImagesComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}