import { Component, OnInit } from '@angular/core';
import {GlobalState} from './../../../../../core/common';
import { dataServices,cardataServices } from '../../../services';
import {Router} from '@angular/router';
import { _ } from 'underscore';
import {
  NzMessageService,
  NzModalService
} from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import { comservices} from '../../../../../shared/services';
@Component({
  selector: 'app-workcartasklist',
  templateUrl: './workcartasklist.component.html',
  styleUrls: ['./workcartasklist.component.scss']
})
export class WorkcartasklistComponent implements OnInit {
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
    private cardataServices:cardataServices,
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
      currusercode:this.comservices.getUserCode,
      enterpriseid: this.EnterPriseCode
    }
    this.dataServices.taskfind(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        var codes = "";
        _.each( self.DataList,it=>{
          codes += (codes == ""?"":",") + "'"+it.processInstanceId+"'"
        })
        if(codes != ""){
          this.loadUserData(codes)
        }
      }
    })
  }

  loadUserData(codes){
    var self = this;
    var postData = {
      codes:codes,
      enterpriseid:this.EnterPriseCode
    }
    this.cardataServices.tprocList(postData).subscribe(result=>{
      if(result){
        _.each(result.data,it=>{
          _.each(self.DataList,iit=>{
             if(it.keycode == iit.keycode){
               iit = Object.assign(iit,it);
             }
          })
        })
      }
    })

  }

  SearchClick(e){
    this.PageNum = 1
    this.loadData();
  }

  addTask(e){
    //页面跳转
    this.router.navigate(['/workflow/cartaskcreate']);
  }

  //处理流程
  dealprocess(data){
    //锁定任务
    var self = this;
    var postData:any = {
      taskid:data.id,
      usercode: this.comservices.getUserCode,
      username:this.comservices.getUserName,
    }
    this.dataServices.task_locktask(postData).subscribe(result => {
      if (result != null) {
        self.OpenProcess(data)
        
      }
    })
  }
  unlockTask(data){
    //锁定任务
    var self = this;
    var postData:any = {
      taskid:data.id,
    }
    this.dataServices.task_unlocktask(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        self.TotalCount = result.recordcount;
        self.SearchClick(null);
      }
    })
  }

  changeState(e,item){
    this.loadData();
  }

  OpenProcess(item){ 
    this.router.navigate(['/workflow/taskworkflow'],{ queryParams: { taskid: item.id,taskcode:item.taskDefinitionKey,processinstanceid:item.processInstanceId } });
  }


  PaperChanged(e){

  }
  PaperBrandChanged(e){

  }
  fabricCodeChanged(e){

  }

  //重置条件
  reset(){

  }
}

