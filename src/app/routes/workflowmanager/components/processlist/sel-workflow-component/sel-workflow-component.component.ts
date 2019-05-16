import { Component, OnInit, Input ,ViewChild,ElementRef} from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService,NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
import { comservices} from '../../../../../shared/services';
import {ArrayService} from '@delon/util'
import {_} from 'underscore';
@Component({
  selector: 'app-sel-workflow-component',
  templateUrl: './sel-workflow-component.component.html',
  styleUrls: [ './sel-workflow-component.component.scss']
})
export class SelWorkflowComponentComponent implements OnInit {

  TreeData:any = {}
  ProcessComponentTreeData:any;
  EnterPriseCode:any;
  expandKeys:any = []
  data:any;
  model:any = {};
  constructor(private msg:NzMessageService,
    private dataServices:dataServices,
    private modal:NzModalRef,
    private sanitizer:DomSanitizer,
    private modalService:NzModalService,
    private comservices:comservices,
    private arrayService:ArrayService) { 
      this.EnterPriseCode = comservices.getEnterPrise
    }

  ngOnInit() {
    console.log(this.data)
    if(this.data.itemdata){
      this.model = Object.assign({},this.data.itemdata);
    }
    console.log(this.model)
    this.loadData();
  }

  loadData(){
    var postData = {
      defproceeid:this.model.defproceeid,
      processcontentid:this.model.keycode
    }
    this.dataServices.findAllComponentByDefAct(postData).subscribe(result => {
      if(result){
        var ComponentData = [];
        _.each(result.data.Componenttypelist,item =>{
          item.id = item.componenttypeid
          item.parent_id = item.pid
          item.title = item.componenttypename,
          item.disabled = true
          ComponentData.push(item)
        })
        _.each(result.data.Component,item=>{
            item.id = item.keycode
            item.parent_id = item.componenttypeid
            item.isLeaf = true
            item.disabled = false
            item.title = item.componentname+"["+item.componenturl+"]"
            item.checked = item.isvalid
            ComponentData.push(item)
        })
        var treeData  = [];
        this.GetTreeData(-1,treeData,ComponentData);
        this.ProcessComponentTreeData = treeData;
      }
    })
  }

  nzCheck(e,type){
    var self = this;
    if(e.eventName == 'check'){
      if(type == 'component'){
        var postData = {
          flag:e.node.isChecked == true?'1':'0',
          keycode:this.model.defproceeid,
          componentid:e.node.origin.keycode,
          processcontentid:this.model.keycode
        }
        this.dataServices.prowercomponent(postData).subscribe(result => {
          if(result){
            self.msg.success("操作成功!");
          }
        })
      }
    }
   
  }

  cancelClick(){
    this.closeModal();
  }

  closeModal(){
    this.modal.close(true);
    this.modal.destroy();
  }

  GetTreeData(pid,CurrArray,AllArray){
    _.each(AllArray,item=>{
      if(item.parent_id == pid){
        CurrArray.push(item)
        item.children = []
        this.GetTreeData(item.id,item.children,AllArray)
      }
    })
  }
  
}
