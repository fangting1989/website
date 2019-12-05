import { Component, Input, ViewContainerRef, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { dataServices } from '../../services';
import { NzMessageService , NzModalService } from 'ng-zorro-antd';
import { ModalHelper } from '@delon/theme';
import {_} from 'underscore';
import { ComponentPanelComponent } from './component-panel/component-panel.component';
import {ComponentPanelEmptyComponent} from './component-panel-empty/component-panel-empty.component';
import { TApprovedEditComponent} from './tapproved-edit/tapproved-edit.component';
import {WorkflowRollbackComponent} from './workflow-rollback/workflow-rollback.component';
@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnDestroy, OnInit {
  task: any = {};
  DataList:any = [];
  ComponentList:any = [];
  RollBackAdviceDataList:any=[];
  currtask:any = {}
  //子组件清单
  @ViewChildren(ComponentPanelComponent) components: QueryList<ComponentPanelComponent>;
  @ViewChildren(ComponentPanelEmptyComponent) emptycomponents: QueryList<ComponentPanelEmptyComponent>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataServices: dataServices,
    private modalService:NzModalService,
    private modalHelper:ModalHelper,
    private resolver: ComponentFactoryResolver,
    public msg: NzMessageService,
  ) { }

  ngOnInit(): void {
    //接收参数
    this.task.taskId = this.route.snapshot.queryParams["taskid"];
    this.task.taskcode = this.route.snapshot.queryParams["taskcode"];
    this.task.processinstanceid = this.route.snapshot.queryParams["processinstanceid"];
    this.loadProcessData();
  }

  ngAfterContentInit() {
    this.loadComponent()
    this.loadRollBackAdvice();
  }

  ngOnDestroy() {

  }

  navBack(){
    history.go(-1);
  }

  //加载流程环节内容弄
  loadProcessData(){
    var postData = {
      taskid:this.task.taskId 
    }
    this.dataServices.gettask(postData).subscribe(result=>{
      if(result){
        this.currtask = result.data
      }
    })
  }

  loadComponent() {
    var self = this;
    var postData:any = {
      taskDefinitionKey: this.task.taskcode
    }
    this.dataServices.opentaskComponent(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
      }
    })
  }

  loadRollBackAdvice(){
    
    var self = this;
    var postData:any = {
      processinstanceid:  this.task.processinstanceid
    }
    this.dataServices.rollbackadvice(postData).subscribe(result => {
      if (result != null) {
        self.RollBackAdviceDataList = result.data;
      }
    })
  }

  ItemClick(item){
    _.each(this.DataList,it=>{it.active = false})
    this.ComponentList =item.componentlist;
    item.active = true;
  }
  
  //查看流程图图片
  ReadProcessImage(){
    var postData = {
      processId:this.task.processinstanceid
    }
    this.dataServices.processDiagram(postData).subscribe(result => {
      if (result != null) {
        var imageItem = {
          filepath:WebConfig.BaseUrl + WebConfig.RequestUrl.flowableworkflow+ result.data
        }
        ComFun.ImageViewer(imageItem,true)
      }
    })

  }

  DelContentItem(){
    var self = this;
    this.modalService.confirm({
      nzTitle     : '提示',
      nzContent   : '<b style="color: red;">是否确认删除当前流程</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        var postData = {
          ids:this.task.processinstanceid
        }
        this.dataServices.task_delete(postData).subscribe(result=>{
          if(result){
            this.msg.info("流程删除成功!");
            this.navBack()
          }
        })
      }
    })
  }

  //提交
  SubmitProcess(){
    var self = this;
    var checkState = true;
    //检查组件的内容
    var CheckResultArray = [];
    this.components.forEach(compInstance => {
      var retData  = compInstance.CheckComponentState()
      CheckResultArray.push(retData);
      if(retData.code < 99){
        var componentName = compInstance.retComponentName || compInstance.ComponentItem.componentname
        componentName = componentName + "";
        self.msg.error("组件["+componentName+"]:"+retData.msg);
        checkState = false;
        return;
      }
    });

    this.emptycomponents.forEach(compInstance => {
      var retData  = compInstance.CheckComponentState()
      CheckResultArray.push(retData);
      if(retData.code < 99){
        var componentName = compInstance.retComponentName || compInstance.ComponentItem.componentname
        componentName = componentName + "";
        self.msg.error("组件["+componentName+"]:"+retData.msg);
        checkState = false;
        return;
      }
    });


    if(!checkState){
      return;
    }
    this.msg.info("正在转入下一环节，请稍后..")
    //打开弹窗
    var data = {itemdata:this.task}
    const modal = this.modalHelper.create(TApprovedEditComponent,{ data: data},{size:500}).subscribe(res => {
      if(res){
        self.ClosePage();
      }
    });
  }

  //退回
  BackProcess(){
    var self = this;
    //打开弹窗
    var data = {itemdata:this.task}
    const modal = this.modalHelper.create(WorkflowRollbackComponent,{ data: data},{size:500}).subscribe(res => {
      if(res){
        self.ClosePage();
      }
    });
  }



  ClosePage() {
    window.history.go(-1)
    // this.router.navigate(['/workflow/tasklist']);
  }
}