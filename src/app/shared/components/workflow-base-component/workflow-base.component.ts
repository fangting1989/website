import { Component, OnInit,EventEmitter,Output,ElementRef  } from '@angular/core';
import { Enums} from './../../utils/enums';
import {_} from 'underscore';
@Component({
  selector: 'app-workflow-base-component',
  template: '<div>workflowbasecomponent</div>',
  styles: []
})
export class WorkflowBaseComponent implements OnInit {

  componentMode:any = "module";
  componentEditMode:any = "edit";
  task:any;
  //EventEmitter 属性
  @Output() component_nameChanged = new EventEmitter<boolean>();

  ComponentStateEnums:any = Object.assign({},Enums.ComponentState)

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {
  }

  /*设置组件名称 */
  setComponentName(name:any){
    this.component_nameChanged.emit(name);
  }

  public CheckComponentState(){
    return this.ComponentStateEnums.Success;
  }

  setComponentRead(){
    let inputEles= this.elementRef.nativeElement.querySelectorAll('input');
    _.each(inputEles,it=>{
      it.disabled ="disabled"
      if(it.className.indexOf("ant-input-disabled") == -1){
        it.className = it.className + " ant-input-disabled";
      }
    })
    //只读
    // _.each(inputEles,it=>{
    //   it.readOnly=true;
    // })
  }
}
