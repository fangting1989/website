import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { forkJoin, of, interval } from 'rxjs';
import { ModalHelper } from '@delon/theme';
import {UploadPzComponent} from '../upload-pz/upload-pz.component'
@Component({
  selector: 'app-needmoney-pz',
  templateUrl: './needmoney-pz.component.html',
  styleUrls: ['./needmoney-pz.component.scss']
})
export class NeedmoneyPzComponent implements OnInit {
  data: any;
  model: any = {}
  EnterPriseCode: any;
  submitting:any = false;
  dataItem:any={}
  // values:any;
  Images: any = [];
  renderObject: any = null;
  DataList:any = []
  TotalCount:any = 0;
  TotalYXJ:any = 0;
  TotalJCBZJ:any = 0;
  TotalZLBZJ:any = 0
  TotalDS:any = 0;
  TotalMoney:any = 0;
  constructor(private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.renderObject = new FileReader();
    if (this.data) {
      if (!this.data.HeadText) {
        this.data.HeadText = "内容编辑"
      }
      if (this.data.itemdata) {
        this.dataItem = Object.assign({}, this.data.itemdata);
        console.log(this.dataItem)
        this.TotalMoney = Utils.accAdd(Utils.accAdd(this.dataItem.yxj,this.dataItem.jbbzj),this.dataItem.zlbzj);
      }
    }
    this.InitData();
  }

  InitData(){
    this.loadData();
    this.loadMoney();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      linktype:2,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode
    }
    this.dataServices.tneedmoneyList(postData).subscribe(result => {
      if (result != null) {
        this.DataList = result.data;
        _.each( this.DataList,it=>{
          it.totalmoney =Utils.accAdd(Utils.accAdd( it.yxj,it.jcbzj),it.zlbzj)
        })
        this.TotalCount = result.recordcount
      }
    })
  }

  loadMoney(){
    var self = this;
    var postData = {
      partnerid:this.dataItem.keycode
    }
    this.dataServices.needmoney(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length == 1 && result.data[0]== null){
          this.TotalDS = this.TotalMoney
        }
        else{
          this.TotalYXJ = result.data[0].yxj
          this.TotalJCBZJ = result.data[0].jcbzj
          this.TotalZLBZJ = result.data[0].zlbzj
          this.TotalDS =Utils.accSub(Utils.accSub(Utils.accSub(this.TotalMoney, this.TotalYXJ),this.TotalJCBZJ),this.TotalZLBZJ)
        }
      }
    })
    
  }


  saveClick() { 
    var data = {HeadText:'填写移交单',itemdata:this.dataItem}
    const modal = this.modalHelper.create(UploadPzComponent,{ data: data},{size:800}).subscribe(res => {
      this.loadData()
    });
  }

  cancelClick() {
    this.closeModal();
  }

  closeModal() {
    this.modal.close(true);
    this.modal.destroy();
  }

}

