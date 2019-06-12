import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import { _ } from 'underscore';
import {Router,ActivatedRoute} from '@angular/router';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';

@Component({
  selector: 'app-process-prowerprocess',
  templateUrl: './process-prowerprocess.component.html',
  styleUrls: ['./process-prowerprocess.component.scss']
})
export class ProcessProwerprocessComponent implements OnInit {
  DataList:any = []
  searchObject:any = {};
  roleid:any;
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
    private _state:GlobalState,
    private router:Router,
    private route: ActivatedRoute,
  ) {
    this.EnterPriseCode = comservices.getEnterPrise
  }

  ngOnInit() {
    this.roleid = this.route.snapshot.queryParams["roleid"];
    this.loadData();
  }

  loadData(){
    var self = this;
    var postData = {
      pagesize:this.PageSize,
      pagenum:this.PageNum,
      searchtext:this.searchObject.searchText,
      enterpriseid: this.EnterPriseCode,
    }
    this.dataServices.enterprise_process(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        _.each(self.DataList,it=>{
          this.loadProcessDefinitiont(it)
          this.loadCheckedState(it,1)
        })
      }
    })
  }

  loadProcessDefinitiont(item){
    item.loadProcessDefinitionList = []
    var postData:any = {
      ProcessId:item.id
    }
    this.dataServices.process_defact(postData).subscribe(result => {
      if (result != null) {
        item.loadProcessDefinitionList = _.filter(result.data,it=>{return it.name != null})
        _.each(item.loadProcessDefinitionList,it_data=>{
          this.loadCheckedState(it_data,2)
        })
      }
    })
  }
  
  loadCheckedState(item,type){
    item.active = false;
    var postData = {
      processdefinitionid:item.id,
      workflowroleid:this.roleid,
      processtype:type   //代表为环节
    }
    this.dataServices.troleprocessList(postData).subscribe(result => {
      if(result){
        if(result.data.length > 0){
          item.active  = true;
        }
      }
    })
  }

  ChangedChecked(item,type){
    var postData = {
      processid:item.id,
      roleid:this.roleid,
      flag:item.active,
      processtype:type,
    }
    this.dataServices.troleprocess_prowerprocess(postData).subscribe(result => {
      if(result){
        this.msg.success("操作成功!");
      }
    })
  }

  SearchClick(e){
    this.loadData();
  }

  changeState(e,item){
    this.loadData();
  }
}

