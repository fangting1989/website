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
  selector: 'app-component-backadvice',
  templateUrl: './backadvice.component.html',
  styleUrls: ['./backadvice.component.scss']
})
export class BackadviceComponent implements OnInit {
  @Input() dataItem:any
  EnterPriseCode:any;
  modelbh:any = {}
  Count:any = 0;
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
    this.loadDataBh()
  }

  loadDataBh(){
    var self = this;
    var postData = {
      pagesize:1,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      partnerid:this.dataItem.keycode,
      pactinsttime:moment(this.dataItem.actinstdate).format('YYYY-MM-DD HH:mm:ss') ,
     // actinststate:this.model.isvalid,
     // approvedpersioncode: this.comservices.getUserCode
    }

    this.dataServices.tapprovedList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        this.modelbh = result.data[0]
        this.Count = 1;
      }
    })
  }

}
