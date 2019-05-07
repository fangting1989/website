import { Component, OnInit, Input ,ViewChild,ElementRef} from '@angular/core';
import { NzMessageService, UploadFile ,NzModalService,NzModalRef } from 'ng-zorro-antd';
import { usersysmanagerServices } from '../../services';
import { DomSanitizer,SafeUrl} from "@angular/platform-browser";
import { comservices} from '../../../../shared/services';
import {ArrayService} from '@delon/util'
import {_} from 'underscore';
@Component({
  selector: 'app-prowermodule',
  templateUrl: './prowermodule.component.html',
  styleUrls: ['./prowermodule.component.scss'],
})
export class ProwermoduleComponent implements OnInit {

  TreeData:any = {}
  RoleUserTreeData:any;
  RoleModuleTreeData:any;
  EnterPriseCode:any;
  expandKeys:any = []
  data:any;
  model:any = {};
  constructor(private msg:NzMessageService,
    private sysService:usersysmanagerServices,
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
    var postData = {
      roleid:this.model.keycode,
      enterpriseid:this.EnterPriseCode
    }
    this.sysService.findAllUserByRole(postData).subscribe(result => {
      if(result){
        var RoleUserData = [];
        _.each(result.data.usertypelist,item =>{
          item.id = item.userTypeID
          item.parent_id = item.pid
          item.title = item.typename,
          item.disabled = true
          RoleUserData.push(item)
        })
        _.each(result.data.userlist,item=>{
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

    this.sysService.findAllModuleByRole(postData).subscribe(result => {
      if(result){
        var RoleModuleData = [];
        _.each(result.data,item =>{
          item.id = item.moduleid
          item.title = item.modulename
          item.parent_id = item.modulepid
          item.disabled = item.cansel == 1
          item.isLeaf = item.cansel == 2
          if(item.cansel == 2){
            item.checked = item.isvalid
          } 
          RoleModuleData.push(item)
        })
        var treeData  = [];
        this.GetTreeData(-1,treeData,RoleModuleData);
        this.RoleModuleTreeData = treeData;
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
        this.sysService.roleproweruser(postData).subscribe(result => {
          if(result){
            self.msg.success("操作成功!");
          }
        })
      }else if(type == 'module'){
        var postData = {
          flag:e.node.isChecked == true?'1':'0',
          roleid:this.model.keycode,
          keycode:e.node.origin.keycode,
          enterpriseid:this.EnterPriseCode
        }
        this.sysService.roleprowermodule(postData).subscribe(result => {
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
