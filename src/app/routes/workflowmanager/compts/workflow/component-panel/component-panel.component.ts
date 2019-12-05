import { Component, Input, ViewContainerRef, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { dataServices } from '../../../services';
import { Utils } from '@shared/utils';
import {Enums} from './../../../../../shared/utils/enums';
import { TasklistComponent } from 'app/routes/sysmanager/components';
@Component({
  selector: 'workflow-component-panel',
  templateUrl: './component-panel.component.html',
  styles: []
})
export class ComponentPanelComponent implements OnInit {
  taskId: any;
  @Input() ComponentItem: any
  @Input() task:any;
  CurrComponet: any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  compRef: ComponentRef<any>; //  加载的组件实例

  retComponentName: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataServices: dataServices,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit(): void {
    //接收参数
  }

  loadComponent(self) {
    var selfComp = this;
    let fact = self.resolver._factories;
    // 根据名称，摸查出组件名称
    fact.forEach((value: any, key: any) => {
      if(value.selector == this.ComponentItem.componenturl){
        this.CurrComponet = key
      }
      // if (key.name === this.ComponentItem.componenturl) {
      //   this.CurrComponet = key;
      // }
    });

    let factory = this.resolver.resolveComponentFactory(this.CurrComponet);
    if (this.compRef) {
      this.compRef.destroy();
    }
    // factory.inputs.push({propName:'task',templateName:'task'})
    //传递参数
    this.compRef = this.container.createComponent(factory) //创建组件
    this.compRef.instance.task = this.task;
    // this.compRef.instance.out.subscribe((res) => {
    //   console.log(res);
    //   //receive from component
    // });
    this.DataInitAfter();
  }
  ngAfterContentInit() {
    //console.log(this.container)
    this.loadComponent(this) 

  }

  ngOnDestroy() {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }

  DataInitAfter() {
    var self = this;
    if (this.compRef.instance.component_nameChanged) {
      this.compRef.instance.component_nameChanged.subscribe((retComponentName) => {
        if (!Utils.IsStringNullOrEmpty(retComponentName)) {
          setTimeout(() => {
            self.retComponentName = retComponentName;
          }, 800);
        }
      })
    }
    //设置组件为 流程组件模式
    if (this.compRef.instance) {
      this.compRef.instance.componentMode = 'component'
    }
    //设置流程模式
    if (this.ComponentItem.editmode == 1) {
      //设置组件只读
      setTimeout(() => {
        self.compRef.instance.setComponentRead();
      }, 800);
    }
  }

  //检查组件状态--业务转出 设置对应的内容
  CheckComponentState() {
    //只读模式不检查
    if(this.ComponentItem.editmode == 2){
      if (this.compRef.instance.CheckComponentState) {
        var stateData = this.compRef.instance.CheckComponentState();
        return stateData;
      }else{
        return Enums.ComponentState.Success
      }
    }else{
      return Enums.ComponentState.Success
    }
    
  }

  /*call component fun*/
  SaveComponent() {
    //  if(this.compRef.instance.SaveComponent){
    //   this.compRef.instance.SaveComponent();
    //  }
    if (this.compRef.instance.saveClick) {
      this.compRef.instance.saveClick();
    }
  }
}
