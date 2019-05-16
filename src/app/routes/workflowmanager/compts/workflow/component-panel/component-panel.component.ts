import {Component, Input, ViewContainerRef, ViewChild,QueryList, ViewChildren,ComponentFactoryResolver,ComponentRef,OnDestroy,OnInit} from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { dataServices } from '../../../services';
@Component({
  selector: 'workflow-component-panel',
  templateUrl: './component-panel.component.html',
  styles: []
})
export class ComponentPanelComponent implements OnInit {
  taskId: any;
  // componentName:any = 'AtestComponent'
  @Input() ComponentItem:any
  CurrComponet:any;
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  compRef: ComponentRef<any>; //  加载的组件实例
  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataServices: dataServices,
    private resolver: ComponentFactoryResolver,
    ) { }

  ngOnInit(): void {
    //接收参数
    //this.taskId = this.route.snapshot.queryParams["taskId"];
  }

  loadComponent(self) {
    let fact = self.resolver._factories;
    // 根据名称，摸查出组件名称
    fact.forEach((value: any, key: any) => {
      if (key.name === this.ComponentItem.componenturl) {
        this.CurrComponet = key;
      }
    });

    let factory = this.resolver.resolveComponentFactory(this.CurrComponet);
    if (this.compRef) {
      this.compRef.destroy();
     }
    this.compRef = this.container.createComponent(factory) //创建组件
  }
 ngAfterContentInit() {
    this.loadComponent(this)
 }
 ngOnDestroy() {
    if(this.compRef){
       this.compRef.destroy();
    }
 }
}
