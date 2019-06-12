import { Component, Input, ViewContainerRef, ViewChild, QueryList, ViewChildren, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { comservices} from '../../shared/services';
import {dataServices} from './services'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss']
})


export class DashboardComponent implements OnInit {
  model:any = {}
  dashboard:any = "DashboardDefaultComponent";

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  compRef: ComponentRef<any>; //  加载的组件实例
  @Input() ComponentItem: any
  CurrComponet: any;

  constructor(
    private http: _HttpClient,
    private comservices:comservices,
    private dataServices:dataServices,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.dashboard = WebConfig.dashboard;
    this.loadData()
  }

  loadData(){
    var self = this; 
    var postData = {
      enterpriseid:this.comservices.getEnterPrise,
      systemconfigtype:10
    }
    this.dataServices.tsystemconfigList(postData).subscribe(result => {
      if(result && result.data.length > 0){
        this.model = result.data[0]
        this.dashboard  = this.model.systemconfigwords
        this.loadComponent(this);
      }else{
        this.dashboard = "DashboardDefaultComponent"
        this.loadComponent(this);
      }
    }) 
  }

  loadComponent(self) {
    var selfComp = this;
    let fact = self.resolver._factories;
    console.log(fact)
    // 根据名称，摸查出组件名称
    fact.forEach((value: any, key: any) => {
      if (key.name ===  this.dashboard) {
        this.CurrComponet = key;
      }
    });

    let factory = this.resolver.resolveComponentFactory(this.CurrComponet);
    if (this.compRef) {
      this.compRef.destroy();
    }
    // factory.inputs.push({propName:'task',templateName:'task'})
    //传递参数
    this.compRef = this.container.createComponent(factory) //创建组件
  }
  ngAfterContentInit() {
    // this.loadComponent(this)
  }
  ngOnDestroy() {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }


}
