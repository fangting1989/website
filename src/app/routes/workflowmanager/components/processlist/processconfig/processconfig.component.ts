import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices } from '../../../services';
import {Router,ActivatedRoute} from '@angular/router';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';

import {SelWorkflowComponentComponent} from './../sel-workflow-component/sel-workflow-component.component';
import {AddprocesscontentComponent} from './../addprocesscontent/addprocesscontent.component';
@Component({
  selector: 'app-processconfig',
  templateUrl: './processconfig.component.html',
  styleUrls: ['./processconfig.component.less']
})
export class ProcessconfigComponent implements OnInit {
  model:any ={}
  DataList:any = []
  ContentList:any = []
  searchObject:any = {
    state:1
  };
  PageNum:any = 1;
  PageSize:any = 10;
  TotalCount:any = 0;
  expandForm:any = false;
  CurrItem:any;
  loading = false;
  EnterPriseCode:any;
  processId:any;
  CurrContentCode:any;
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
    this.processId = this.route.snapshot.queryParams["processId"];
    this.loadData();
  }

  loadData(){
    var postData:any = {
      ProcessId:this.processId
    }
    this.dataServices.process_defact(postData).subscribe(result => {
      if (result != null) {
        this.DataList = _.filter(result.data,it=>{return it.name != null}) ;
        if(this.DataList.length > 0){
          this.loadContent(this.DataList[0])
          this.CurrItem = this.DataList[0]
        }
      }
    })
  }

  loadContent(item){
    item.active = true;
    var self = this;
    this.model.taskid = item.id;
    var postData:any = {
      defproceeid:item.id
    }
    this.dataServices.tprocesscontentList(postData).subscribe(result => {
      if (result != null) {
        this.ContentList = result.data;
        _.each(this.ContentList,it=>{
          self.loadComponent(it,self.model.taskid)
        })
      }
    })
  }
  loadComponent(item,taskid){
    var postData:any = {
      processcontentid:item.keycode
    }
    this.dataServices.tprocesscomponentList(postData).subscribe(result => {
      if (result != null) {
        item.ComponentList = result.data;
      }
    })
  }

  ItemClick(item){
    _.each(this.DataList,it=>{it.active = false})
    item.active = true;
    this.CurrItem = item
    this.loadContent(item)
  }

  AddComponent(dataItem){
    var self = this;
    var item = dataItem;
    var data = {HeadText:'流程配置组件',itemdata:item}
    const modal = this.modalHelper.create(SelWorkflowComponentComponent,{ data: data},{size:800}).subscribe(res => {
      self.loadContent(self.CurrItem);
    });
  }

  addContent(){
    var self = this;
    var item  = this.model
    var data = {HeadText:'流程内容添加',itemdata:item}
    const modal = this.modalHelper.create(AddprocesscontentComponent,{ data: data},{size:800}).subscribe(res => {
      self.loadContent(self.CurrItem);
    });
  }



  editComponentItem(item){

  }

  delComponentItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode
        }
        self.dataServices.tprocesscomponentDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadContent(self.CurrItem);
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {
      
      }
    });
  }

  EditContentItem(item){
    var self = this;
    var data = {HeadText:'流程内容添加',itemdata:item}
    const modal = this.modalHelper.create(AddprocesscontentComponent,{ data: data},{size:800}).subscribe(res => {
      self.loadContent(self.CurrItem);
    });
  }

  DelContentItem(item){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除对象</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          keycode:item.keycode
        }
        self.dataServices.tprocesscontentDel(postData).subscribe(result => {
          if (result != null) {
            self.msg.success("删除成功!");
            self.loadContent(self.CurrItem);
          }
        })
      },
      nzCancelText: '取消',
      nzOnCancel  : () => {
      
      }
    });
  }
}

