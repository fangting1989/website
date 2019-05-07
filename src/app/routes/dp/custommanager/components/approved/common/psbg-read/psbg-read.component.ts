import { Component, OnInit,Input,Output,EventEmitter,ChangeDetectorRef ,NgZone } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-component-psbg-read',
  templateUrl: './psbg-read.component.html',
  styleUrls: ['./psbg-read.component.scss']
})
export class PsbgReadComponent implements OnInit {
  @Input() dataItem:any
  @Input() ComponentMode:any = 'read'; //edit 编辑状态  unedit 不能编辑状态 //readonly 只读状态
  EnterPriseCode:any;
  model:any = {}
  ProinstList:any;
  LXRArray:any = []
  DBRArray:any = []
  UserName:any;
  randomData:any ;
  submitting:any;
  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService,
    private cdr: ChangeDetectorRef,
    private zone:NgZone,
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
    this.UserName = this.comservices.getUserName 
  }

  ngOnInit() {
    this.model.shf = this.UserName
    this.loadData()
  }

  dataChange(data){
    console.log(data)
    var self = this;
    this.randomData  =Math.random();
    this.cdr.detectChanges();
    this.zone.run(()=>{
      self.randomData  =Math.random();
    })

    var array = document.getElementsByClassName("item-textarea");
    console.log(array)
    for (var i=0;i<array.length;i++){
      autosize(array[i])
    }

  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:1,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode
    }
    this.dataServices.tpsreportList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        this.model = result.data[0]
      }
    })
  }

  saveClick() {
    this.model.partnerid = this.dataItem.keycode
    var self = this;
    if(this.submitting){
        return
    }
    this.submitting = true;
    var self = this;
    this.model.enterpriseid = this.EnterPriseCode
    if (this.model.keycode) {
      this.dataServices.tpsreportUp(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    } else {
      this.model.partnerid = this.dataItem.keycode
      this.dataServices.tpsreportIn(this.model).subscribe(result => {
        this.submitting = false
        if (result != null) {
          self.model = result.data;
          self.msg.success("操作成功!");
        }
      })
    }
  }
}

