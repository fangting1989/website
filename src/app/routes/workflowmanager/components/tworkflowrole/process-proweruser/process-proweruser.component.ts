import { Component, OnInit, Input ,ViewChild,ElementRef} from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService,NzModalRef } from 'ng-zorro-antd';
import { dataServices } from '../../../services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
import { comservices} from '../../../../../shared/services';
import {ArrayService} from '@delon/util'
import {_} from 'underscore';
@Component({
  selector: 'app-process-proweruser',
  templateUrl: './process-proweruser.component.html',
  styleUrls: ['./process-proweruser.component.scss']
})
export class ProcessProweruserComponent implements OnInit {

  TreeData:any = {}
  RoleUserTreeData:any;
  RoleModuleTreeData:any;
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
    if(this.data.itemdata){
      this.model = Object.assign({},this.data.itemdata);
    }
    this.loadData();
  }

  loadData(){
    console.log(this.model)
    console.log(this.comservices.getEnterPrise)
    var self = this;
    var postData = {
      roleid:this.model.keycode,
      enterpriseid:this.EnterPriseCode
    }
    this.dataServices.enterprise_findAllUser(postData).subscribe(result => {
      if(result){
        this.loadRoleUser(result.data);
      }
    })
  }

  loadRoleUser(itemdata){
    var self = this;
    //获得对应的角色
    var ppostData = {
      workflowroleid:this.model.keycode,
      encrypt:true
    }
    self.dataServices.tuserworkflowroleList(ppostData).subscribe(ret_result => {
      if(ret_result){
        var RoleUserData = [];
        _.each(itemdata.usertypelist,item =>{
          item.id = item.userTypeID
          item.parent_id = item.pid
          item.title = item.typename,
          item.disabled = true
          RoleUserData.push(item)
        })
        _.each(itemdata.userlist,item=>{
          //检测数据
          _.each(ret_result.data,iitem=>{
             if( item.keycode == iitem.userid){
               item.isvalid = 1;
             }
          })
            item.id = item.keycode
            item.parent_id = item.usertypeid
            item.isLeaf = true
            item.disabled = false
            item.title = item.adminusernickname
            item.checked = item.isvalid
            RoleUserData.push(item)
        })
        var treeData  = [];
        this.GetTreeData(-1,treeData,RoleUserData);
        this.RoleUserTreeData = treeData;

      }
    })
  }

  nzCheck(e,type){
    var self = this;
    if(e.eventName == 'check'){
      if(type == 'user'){
        var postData = {
          flag:e.node.isChecked == true?'1':'0',
          roleid:this.model.keycode,
          keycode:e.node.origin.keycode,
          enterpriseid:this.EnterPriseCode
        }
        this.dataServices.roleproweruser(postData).subscribe(result => {
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
