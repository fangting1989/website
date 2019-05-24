import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../core/common';
import { dataServices } from '../../services';
import {Router} from '@angular/router';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../shared/services';


@Component({
  selector: 'app-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.less']
})
export class ProcesslistComponent implements OnInit {
  DataList:any = []
  searchObject:any = {
    state:1
  };
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  loading = false;
  EnterPriseCode:any;
  constructor(
    public msg: NzMessageService,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private dataServices:dataServices,
    private comservices:comservices,
    private _state:GlobalState,
    private router:Router,
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
      enterpriseid: this.EnterPriseCode
    }
    if(this.searchObject.searchText){
      postData.filterText = this.searchObject.searchText
    }
    this.dataServices.process_find(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }
  readProcessDefAct(item){
    var self = this;
    console.log(item)
    this.router.navigate(['/workflow/processconfig'],{ queryParams: { processId: item.id,deploymentid:item.deploymentid } });
    
  }
}
