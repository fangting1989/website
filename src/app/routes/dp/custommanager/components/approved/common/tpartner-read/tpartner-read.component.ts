import { Component, OnInit,Input } from '@angular/core';
import { NzMessageService, NzModalRef,NzModalService } from 'ng-zorro-antd';
import { dataServices } from '../../../../services';
import { Enums } from './../../../../../../../shared/utils/enums';
import { comservices } from '../../../../../../../shared/services';
import { UUID } from 'angular2-uuid';

import {_} from 'underscore'
import { Utils} from './../../../../../../../shared/utils/utils';
import * as moment from  'moment'

@Component({
  selector: 'app-component-tpartner-read',
  templateUrl: './tpartner-read.component.html',
  styleUrls: ['./tpartner-read.component.scss']
})
export class TpartnerReadComponent implements OnInit {
  @Input() dataItem:any
  EnterPriseCode:any;
  modelbh:any = {}
  ProinstList:any;
  LXRArray:any = []
  DBRArray:any = []
  constructor(
    private msg: NzMessageService,
    private dataServices: dataServices,
    private modal: NzModalRef,
    private comservices: comservices,
    private modalService:NzModalService
  ) { 
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.loadLinkpartnerList()
  }

  loadLinkpartnerList(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode
    }
    this.dataServices.tlinkpartnerList(postData).subscribe(result => {
      if (result != null) {
        console.log(result.data)
        if(result.data.length >0){
          this.LXRArray = _.filter(result.data,it=>{return it.linktype == 1}) ;
          this.DBRArray = _.filter(result.data,it=>{return it.linktype == 2}) ;
        }
      }
    })
  }
}
