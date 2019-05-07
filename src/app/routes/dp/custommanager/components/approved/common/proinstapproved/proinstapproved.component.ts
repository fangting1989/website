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
  selector: 'app-component-proinstapproved',
  templateUrl: './proinstapproved.component.html',
  styleUrls: ['./proinstapproved.component.scss']
})
export class ProinstapprovedComponent implements OnInit {
  @Input() dataItem:any
  EnterPriseCode:any;
  modelbh:any = {}
  ProinstList:any;
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
    this.loadProinstList()
  }

  loadProinstList(){
    var self = this;
    var postData = {
      pagesize:100,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      tableid:this.dataItem.keycode,
      tablename:'partner'
    }
    this.dataServices.tproinstList(postData).subscribe(result => {
      if (result != null) {
        if(result.data.length >0){
          this.ProinstList = result.data;
          _.each(this.ProinstList,item=>{
            self.loadApprovedsp(item)
          })
        }
      }
    })
  }

  loadApprovedsp(item){
    var self = this;
    var postData = {
      pagesize:20,
      pagenum:1,
      enterpriseid: this.EnterPriseCode,
      proinstid:item.keycode
    }

    this.dataServices.tapprovedList(postData).subscribe(result => {
      if (result != null && result.data.length) {
        item.approvedlist =  result.data
      }
    })
  }
}
