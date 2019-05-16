import { Component, Input, ViewContainerRef, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { dataServices } from '../../services';
import {_} from 'underscore';
//import { Components } from './../../workflowmanager.components';
//import {AtestComponent} from './../../components/atest/atest.component';
import { ComponentPanelComponent } from './component-panel/component-panel.component';
@Component({
  selector: 'app-workflow',
  //entryComponents: [...Components],
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent implements OnDestroy, OnInit {
  task: any = {};
  DataList:any = [];
  ComponentList:any = [];
  // @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataServices: dataServices,
    private resolver: ComponentFactoryResolver,
  ) { }



  ngOnInit(): void {
    //接收参数
    this.task.taskId = this.route.snapshot.queryParams["taskId"];
    this.task.taskcode = this.route.snapshot.queryParams["taskcode"];
  }

  ngAfterContentInit() {
    this.loadComponent()
    //console.log(this.childComponents)
  }

  ngOnDestroy() {

  }

  loadComponent() {
    var self = this;
    var postData:any = {
      taskDefinitionKey: this.task.taskcode
    }
    this.dataServices.opentaskComponent(postData).subscribe(result => {
      if (result != null) {
        self.DataList = result.data;
        if(self.DataList.length > 0 ){
          self.ComponentList = self.DataList[0].componentlist
        }
      }
    })
  }

  ItemClick(item){
    _.each(this.DataList,it=>{it.active = false})
    this.ComponentList =item.componentlist;
    item.active = true;
  }

  DealTask(e) {
    // var self = this;
    // var postData: any = {
    //   id: this.taskId
    // }
    // this.dataServices.task_finishcurrtask(postData).subscribe(result => {
    //   if (result != null) {
    //     console.log(result);
    //   }
    // })
  }

  ClosePage() {
    this.router.navigate(['/workflow/tasklist']);
  }
}





