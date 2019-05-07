import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../../../core/common';
import { dataServices } from '../../../../services';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../../../shared/services';
import {DdkImagesUploadComponent} from './../../ddk-images-upload/ddk-images-upload.component'
@Component({
  selector: 'app-ddkpage',
  templateUrl: './ddkpage.component.html',
  styleUrls: ['./ddkpage.component.scss']
})
export class DdkpageComponent implements OnInit {

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
      enterpriseid: this.EnterPriseCode,
      isvalid:1030
    }
    this.dataServices.toutmoneyList(postData).subscribe(result => {
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
    this.loadData();
  }

  printBill(item){
    var loadding = this.msg.info("正在下载文件，请稍后..")
     //下载单子
     var postData = {
       enterpriseid:this.comservices.getEnterPrise,
       outmoneykeycode:item.keycode,
       dealperson:this.comservices.getUserName
     }
     this.dataServices.file_shd_download(postData).subscribe(result => {
       this.msg.remove( loadding.messageId) 
      if(result){
        window.location = WebConfig.RequestUrl.dpworkservice + result.data
      }
    })
  }

  UploadPZ(item){
    var data = {HeadText:'上传凭证',itemdata:item}
    const modal = this.modalHelper.create(DdkImagesUploadComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }
}