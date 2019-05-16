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
  selector: 'app-worktasklist',
  templateUrl: './worktasklist.component.html',
  styleUrls: ['./worktasklist.component.scss']
})
export class WorktasklistComponent implements OnInit {
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
  StateArray:any = [{name:"流程",value:1},{name:'案例模型',value:2},{name:'表单',value:3},{name:'决策表',value:4},{name:'应用程序',value:5}]
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
    this.dataServices.taskfind(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  addTask(e){
    //页面跳转
    this.router.navigate(['/workflow/tasklistcreate']);
  }

  changeState(e,item){
    this.loadData();
  }

  OpenProcess(item){
    this.router.navigate(['/workflow/taskworkflow'],{ queryParams: { taskid: item.id,taskcode:item.taskDefinitionKey } });
  }
}

